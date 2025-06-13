import { Router } from 'express';
import { query } from '../config/database';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// POST /api/appointments –– create a new appointment
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const { patient_id, doctor_id, date, reason, status } = req.body;
  if (!patient_id || !doctor_id || !date || !reason || !status) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  const result = await query(
    `INSERT INTO appointments (patient_id, doctor_id, date, reason, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, patient_id, doctor_id, date, reason, status, created_at, updated_at;`,
    [patient_id, doctor_id, date, reason, status]
  );
  if (!result.rows || result.rows.length === 0) {
    return res.status(500).json({ message: 'Failed to create appointment.' });
  }
  res.status(201).json(result.rows[0]);
}));

// GET /api/appointments –– list all appointments (demo: no filtering)
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const result = await query('SELECT * FROM appointments ORDER BY date DESC;');
  res.status(200).json(result.rows);
}));

export default router; 