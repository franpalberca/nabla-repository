import { Router } from 'express';
import { createUser, loginUser, getUserById, deleteUserById, getAllUsers, updateUserById } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .post('/login', loginUser)
    .get('/:userId', getUserById)
    .get('/', getAllUsers)
    .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;