import express from 'express';
import { register, login, verifyEmail, sendVerifyOTP} from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/send-verify-otp', sendVerifyOTP);

export default router;