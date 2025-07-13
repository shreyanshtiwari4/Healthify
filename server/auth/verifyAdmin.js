import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== 'admin') throw new Error('Unauthorized');
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};
