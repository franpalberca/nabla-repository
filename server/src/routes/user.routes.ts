import { Router } from 'express';
import { createUser, getUserByEmail, deleteUserById, getAllUsers, updateUserById } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmail)
    .get('/', getAllUsers)
    .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;