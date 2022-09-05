import express from 'express';
import { protect } from '../middleware/authMiddleware';

import {
    getAllProjectsHandler,
    getProjectByIdHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
} from '../controllers/projectController';

const projectRoutes = express.Router();

projectRoutes
    .route('/')
    .get(getAllProjectsHandler)
    .post(protect, createProjectHandler);
projectRoutes
    .route('/:projectId')
    .get(getProjectByIdHandler)
    .put(protect, updateProjectHandler)
    .delete(protect, deleteProjectHandler);

export default projectRoutes;
