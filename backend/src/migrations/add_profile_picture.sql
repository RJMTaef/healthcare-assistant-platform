-- backend/src/migrations/add_profile_picture.sql

-- Add a 'profile_picture' (VARCHAR(255)) column to the users table (default NULL)
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_picture VARCHAR(255) DEFAULT NULL; 