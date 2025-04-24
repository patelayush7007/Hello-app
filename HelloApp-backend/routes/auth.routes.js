import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import passport from 'passport';
import  isAuthenticated  from '../middlewares/isAuthenticated.js';
import  isAdmin  from '../middlewares/isAdmin.js';
import User from '../models/user.model.js';

const router = express.Router();
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    
    const query = new URLSearchParams({
      username: user.username,
      name: user.displayName,
      photo: user.photos?.[0]?.value || '',
    }).toString();

    res.redirect(`http://localhost:4200/twitter-success?${query}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/users/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

export default router;
