import { Router, RequestHandler } from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Helper: validate email format
function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// POST /api/auth/register
const registerHandler: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  // Basic validation
  if (!email || !password || !firstName || !lastName || !role) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format.' });
    return;
  }
  if (!['patient', 'doctor', 'admin'].includes(role)) {
    res.status(400).json({ message: 'Invalid role.' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters.' });
    return;
  }

  try {
    // Check if user already exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing && existing.rowCount && existing.rowCount > 0) {
      res.status(409).json({ message: 'User already exists.' });
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role, created_at`,
      [email, passwordHash, firstName, lastName, role]
    );

    const user = result.rows[0];
    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// POST /api/auth/login
const loginHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format.' });
    return;
  }

  try {
    // Find user by email
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (!result || !result.rows || result.rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }
    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Generate JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    const secret: string = process.env.JWT_SECRET || 'default_secret';
    const options = { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as any;
    const token = jwt.sign(payload, secret, options);

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Protected route: Get current user's profile
const profileHandler = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const result = await query('SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1', [user.id]);
  if (!result.rows.length) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const dbUser = result.rows[0];
  res.json({
    id: dbUser.id,
    email: dbUser.email,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    role: dbUser.role,
    createdAt: dbUser.created_at
  });
};

// PATCH /api/auth/profile - update current user's profile
router.patch('/profile', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const result = await query(
    `UPDATE users SET first_name = $1, last_name = $2, email = $3, updated_at = NOW() WHERE id = $4 RETURNING id, email, first_name, last_name, role, created_at, updated_at`,
    [firstName, lastName, email, user.id]
  );
  if (!result.rows.length) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const updatedUser = result.rows[0];
  res.json({
    id: updatedUser.id,
    email: updatedUser.email,
    firstName: updatedUser.first_name,
    lastName: updatedUser.last_name,
    role: updatedUser.role,
    createdAt: updatedUser.created_at,
    updatedAt: updatedUser.updated_at,
  });
}));

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/profile', authMiddleware, asyncHandler(profileHandler));

export default router; 