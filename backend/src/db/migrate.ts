import fs from 'fs';
import path from 'path';
import pool from '../config/database';

interface Migration {
  name: string;
}

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get all migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    // Get already executed migrations
    const { rows: executedMigrations } = await client.query<Migration>(
      'SELECT name FROM migrations'
    );
    const executedMigrationNames = new Set(executedMigrations.map((m: Migration) => m.name));

    // Execute new migrations
    for (const file of files) {
      if (!executedMigrationNames.has(file)) {
        console.log(`🔄 Running migration: ${file}`);
        
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        
        // Start transaction
        await client.query('BEGIN');
        
        try {
          // Execute migration
          await client.query(sql);
          
          // Record migration
          await client.query(
            'INSERT INTO migrations (name) VALUES ($1)',
            [file]
          );
          
          await client.query('COMMIT');
          console.log(`✅ Completed migration: ${file}`);
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(`❌ Failed migration: ${file}`, error);
          throw error;
        }
      }
    }
    
    console.log('✨ All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export default runMigrations; 