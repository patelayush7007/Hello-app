import express from 'express';
import User from '../models/user.model.js';
import  isAuthenticated from '../middlewares/isAuthenticated.js';
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router();

// Get all users
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user by ID
router.delete('/users/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
