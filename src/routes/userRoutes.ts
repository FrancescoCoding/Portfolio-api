import express from 'express';
import { protect } from '../middleware/authMiddleware';

const userController = require('../controllers/userController');

const {
    getAllUsersHandler,
    createUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserHandler,
    loginUserHandler,
} = userController;

const userRoutes = express.Router();

userRoutes.route('/').get(protect, getAllUsersHandler).post(createUserHandler);
userRoutes.route('/login').post(loginUserHandler);
userRoutes
    .route('/:userId')
    .get(getUserByIdHandler)
    .put(protect, updateUserHandler)
    .delete(protect, deleteUserHandler);

export default userRoutes;
