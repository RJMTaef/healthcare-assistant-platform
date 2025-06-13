import { Pool } from 'pg';
import { config } from 'dotenv';

config();

// Create a new pool using the connection string from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add SSL configuration if needed (for production)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.stack);
  } else {
    console.log('✅ Successfully connected to database');
    release();
  }
});

// Export a query function that uses the pool
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
};

export default pool; 