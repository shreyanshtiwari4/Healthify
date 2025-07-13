import Admin from '../models/AdminSchema.js';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';
import jwt from 'jsonwebtoken';

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({ token, role: 'admin', message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
};

// Get pending doctors
export const getPendingDoctors = async (req, res) => {
  const pending = await Doctor.find({ isApproved: 'pending' });
  res.status(200).json(pending);
};

export const updateDoctorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const doctor = await Doctor.findByIdAndUpdate(id, { isApproved: status }, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: `Doctor status updated to ${status}`, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

