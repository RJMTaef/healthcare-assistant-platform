-- backend/src/migrations/add_email_verification.sql

-- Add an 'is_email_verified' (BOOLEAN) column (default FALSE) to the users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN DEFAULT FALSE; 