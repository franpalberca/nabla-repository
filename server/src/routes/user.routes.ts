import { Router } from 'express';
import { createUser, loginUser, deleteUserById, getAllUsers, updateUserById } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { upload } from '../config/multer';

const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .post('/login', loginUser)
    .get('/', getAllUsers)
    .patch('/:userId', authenticateJWT, upload.single('userImage'), updateUserById)
    .delete('/:userId', authenticateJWT, deleteUserById);

export default userRoutes;