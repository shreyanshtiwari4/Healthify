import express from 'express';
import {
  loginAdmin,
  getAllUsers,
  getAllDoctors,
  getPendingDoctors,
  updateDoctorStatus,
} from '../Controllers/adminController.js';
import { verifyAdmin } from '../auth/verifyAdmin.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/users', verifyAdmin, getAllUsers);
router.get('/doctors', verifyAdmin, getAllDoctors);
router.get('/doctors/pending', verifyAdmin, getPendingDoctors);
router.put('/doctors/:id/status', verifyAdmin, updateDoctorStatus);

export default router;
