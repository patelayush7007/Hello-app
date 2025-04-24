export default function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
}
