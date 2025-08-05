import { Router } from 'express';
import { query } from '../config/database';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/notifications - get notifications for current user
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  const { unread_only } = req.query;
  
  let queryText = 'SELECT id, type, message, is_read, created_at FROM notifications WHERE user_id = $1';
  let params = [user.id];
  
  if (unread_only === 'true') {
    queryText += ' AND is_read = false';
  }
  
  queryText += ' ORDER BY created_at DESC LIMIT 50';
  
  const result = await query(queryText, params);
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

// PATCH /api/notifications/:id - mark notification as read
router.patch('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  
  const result = await query(
    'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING id, type, message, is_read, created_at',
    [id, user.id]
  );
  
  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({ message: 'Notification not found.' });
  }
  
  res.json(result.rows[0]);
}));

// PATCH /api/notifications/read-all - mark all notifications as read
router.patch('/read-all', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  
  await query(
    'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false',
    [user.id]
  );
  
  res.json({ message: 'All notifications marked as read.' });
}));

// DELETE /api/notifications/:id - delete a notification
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  
  const result = await query(
    'DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, user.id]
  );
  
  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({ message: 'Notification not found.' });
  }
  
  res.json({ message: 'Notification deleted successfully.' });
}));

// GET /api/notifications/unread-count - get count of unread notifications
router.get('/unread-count', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  
  const result = await query(
    'SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false',
    [user.id]
  );
  
  res.json({ count: parseInt(result.rows[0].count) });
}));

export default router; 