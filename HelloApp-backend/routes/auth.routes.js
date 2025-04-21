import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import passport from 'passport';
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

export default router;
