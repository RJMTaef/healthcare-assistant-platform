import { Router } from 'express';
import { query } from '../config/database';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/notifications - get notifications for current user
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  const result = await query(
    'SELECT id, type, message, is_read, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
    [user.id]
  );
  res.json(result.rows);
}));

// POST /api/notifications - create a notification (for demo/testing)
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  const { type, message } = req.body;
  if (!type || !message) {
    return res.status(400).json({ message: 'Type and message are required.' });
  }
  const result = await query(
    'INSERT INTO notifications (user_id, type, message) VALUES ($1, $2, $3) RETURNING id, type, message, is_read, created_at',
    [user.id, type, message]
  );
  res.status(201).json(result.rows[0]);
}));

export default router; 