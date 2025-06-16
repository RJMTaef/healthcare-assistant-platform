import { Router } from 'express';
import { query } from '../config/database';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// GET /api/doctors - list all doctors
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE role = 'doctor' ORDER BY last_name, first_name;`
  );
  res.status(200).json(result.rows);
}));

export default router; 