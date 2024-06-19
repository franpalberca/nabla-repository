import { Router } from 'express';
import { createUser, loginUser, getUserByEmail, deleteUserById, getAllUsers, updateUserById } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .post('/login', loginUser)
    .get('/:userEmail', getUserByEmail)
    .get('/', getAllUsers)
    .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;