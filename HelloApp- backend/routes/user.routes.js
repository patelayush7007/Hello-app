import express from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  insertUsersBulk
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.post('/bulk', insertUsersBulk);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;
