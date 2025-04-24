import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import session from 'express-session';
import passport from './config/passport.js';
import isAdmin  from './middlewares/isAdmin.js';
import adminRoutes from './routes/admin.routes.js'
const app = express();
dotenv.config();


app.use(session({
  secret: 'twitter_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
connectDB();


// Mounting routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', isAdmin, adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
