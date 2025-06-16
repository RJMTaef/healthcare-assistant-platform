CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Trigger to update updated_at on update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON notifications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add a 'specialization' column to the users table (for doctors)
ALTER TABLE users ADD COLUMN IF NOT EXISTS specialization VARCHAR(100) DEFAULT NULL;

-- Add a 'profile_picture' column (VARCHAR(255)) to the users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_picture VARCHAR(255) DEFAULT NULL;

-- Add a 'is_email_verified' (BOOLEAN) column to the users table (default FALSE)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN DEFAULT FALSE;

-- Add a 'reminder_sent' (BOOLEAN) column to the appointments table (default FALSE)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT FALSE;

-- Add a 'is_read' (BOOLEAN) column (default FALSE) to the notifications table
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- Add a 'is_reminder_sent' (BOOLEAN) column (default FALSE) to the appointments table
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS is_reminder_sent BOOLEAN DEFAULT FALSE; 