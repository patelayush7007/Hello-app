import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

 const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
export default isAuthenticated