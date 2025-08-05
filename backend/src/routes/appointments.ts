import { Router } from 'express';
import { query } from '../config/database';
import authMiddleware from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// POST /api/appointments –– create a new appointment
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const { doctor_id, date, reason, status = 'scheduled' } = req.body;
  const patient_id = req.user.id;

  if (!doctor_id || !date || !reason) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Validate date is in the future
  const appointmentDate = new Date(date);
  if (appointmentDate <= new Date()) {
    return res.status(400).json({ message: 'Appointment date must be in the future.' });
  }

  const result = await query(
    `INSERT INTO appointments (patient_id, doctor_id, date, reason, status) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, patient_id, doctor_id, date, reason, status, created_at, updated_at;`,
    [patient_id, doctor_id, date, reason, status]
  );

  if (!result.rows || result.rows.length === 0) {
    return res.status(500).json({ message: 'Failed to create appointment.' });
  }

  res.status(201).json(result.rows[0]);
}));

// GET /api/appointments –– list appointments for current user
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const user = req.user;
  let queryText: string;
  let params: any[];

  if (user.role === 'doctor') {
    // Doctors see appointments where they are the doctor
    queryText = `
      SELECT a.*, 
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             p.email as patient_email
      FROM appointments a
      JOIN users p ON a.patient_id = p.id
      WHERE a.doctor_id = $1
      ORDER BY a.date DESC
    `;
    params = [user.id];
  } else {
    // Patients see their own appointments
    queryText = `
      SELECT a.*, 
             d.first_name as doctor_first_name, 
             d.last_name as doctor_last_name,
             d.specialization
      FROM appointments a
      JOIN users d ON a.doctor_id = d.id
      WHERE a.patient_id = $1
      ORDER BY a.date DESC
    `;
    params = [user.id];
  }

  const result = await query(queryText, params);
  res.status(200).json(result.rows);
}));

// GET /api/appointments/:id –– get specific appointment
router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  let queryText: string;
  let params: any[];

  if (user.role === 'doctor') {
    queryText = `
      SELECT a.*, 
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             p.email as patient_email
      FROM appointments a
      JOIN users p ON a.patient_id = p.id
      WHERE a.id = $1 AND a.doctor_id = $2
    `;
    params = [id, user.id];
  } else {
    queryText = `
      SELECT a.*, 
             d.first_name as doctor_first_name, 
             d.last_name as doctor_last_name,
             d.specialization
      FROM appointments a
      JOIN users d ON a.doctor_id = d.id
      WHERE a.id = $1 AND a.patient_id = $2
    `;
    params = [id, user.id];
  }

  const result = await query(queryText, params);
  
  if (!result.rows || result.rows.length === 0) {
    return res.status(404).json({ message: 'Appointment not found.' });
  }

  res.status(200).json(result.rows[0]);
}));

// PATCH /api/appointments/:id –– update appointment status
router.patch('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user;

  if (!status || !['scheduled', 'pending', 'cancelled', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Valid status is required.' });
  }

  // Check if user can update this appointment
  let checkQuery: string;
  let checkParams: any[];

  if (user.role === 'doctor') {
    checkQuery = 'SELECT id FROM appointments WHERE id = $1 AND doctor_id = $2';
    checkParams = [id, user.id];
  } else {
    checkQuery = 'SELECT id FROM appointments WHERE id = $1 AND patient_id = $2';
    checkParams = [id, user.id];
  }

  const checkResult = await query(checkQuery, checkParams);
  if (!checkResult.rows || checkResult.rows.length === 0) {
    return res.status(404).json({ message: 'Appointment not found.' });
  }

  const result = await query(
    'UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, id]
  );

  res.status(200).json(result.rows[0]);
}));

// DELETE /api/appointments/:id –– cancel appointment
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  // Check if user can cancel this appointment
  let checkQuery: string;
  let checkParams: any[];

  if (user.role === 'doctor') {
    checkQuery = 'SELECT id FROM appointments WHERE id = $1 AND doctor_id = $2';
    checkParams = [id, user.id];
  } else {
    checkQuery = 'SELECT id FROM appointments WHERE id = $1 AND patient_id = $2';
    checkParams = [id, user.id];
  }

  const checkResult = await query(checkQuery, checkParams);
  if (!checkResult.rows || checkResult.rows.length === 0) {
    return res.status(404).json({ message: 'Appointment not found.' });
  }

  const result = await query(
    'UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    ['cancelled', id]
  );

  res.status(200).json({ message: 'Appointment cancelled successfully.' });
}));

export default router; 