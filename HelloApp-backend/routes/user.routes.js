import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  insertUsersBulk,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post('/bulk', insertUsersBulk);

router.get('/', getAllUsers);


router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
