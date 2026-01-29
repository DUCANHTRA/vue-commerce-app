import express from 'express';
import {
    getUserById,
    registerUser,
    loginUser
} from '../controllers/userControllers.js';

const router = express.Router();

router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
