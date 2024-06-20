import { Router } from 'express';
import { createUser, loginUser, deleteUserById, getAllUsers, updateUserById } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { upload } from '../config/multer';
import { authorizeAdmin } from '../middleware/authorizeAdmin';

const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .post('/login', loginUser)
    .get('/all-users', authenticateJWT, authorizeAdmin, getAllUsers)
    .patch('/:userId', authenticateJWT, upload.single('userImage'), updateUserById)
    .delete('/:userId', authenticateJWT, deleteUserById);

export default userRoutes;