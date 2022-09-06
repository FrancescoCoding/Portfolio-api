import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthorizedUserRequest } from '../middleware/authMiddleware';
import { sanitizeId } from '../sanitizers/userSanitizer';

import {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject,
} from '../services/projectService';
import HttpException from '../utils/httpException';

// @desc Get all projects
// @route GET /api/v1/projects
// @access Public
export const getAllProjectsHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const projects = await getAllProjects();
        res.status(200).json(projects);
    }
);

// @desc Get a single project by id
// @route GET /api/projects/:projectId
// @access Public
export const getProjectByIdHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const projectId = req.params.projectId;

        const project = await getProjectById(projectId);

        res.status(200).json({ project });
    }
);

// @desc Create a project
// @route POST /api/projects
// @access Private
export const createProjectHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response, next: NextFunction) => {
        const projectBody = req.body;
        const userId = req.user?._id;

        const createdProject = await createProject(projectBody, userId);

        res.status(201).json({ createdProject });
    }
);

// @desc Update a project
// @route PUT /api/projects/:projectId
// @access Private
export const updateProjectHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response, next: NextFunction) => {
        const projectId = req.params.projectId;
        const projectBody = req.body;
        const userId = req.user?._id;

        await isUserAuthorized(userId, projectId);

        const project = await updateProject(projectId, projectBody, userId);

        res.status(200).json({ project });
    }
);

// @desc Delete a project
// @route DELETE /api/projects/:projectId
// @access Private
export const deleteProjectHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response, next: NextFunction) => {
        const projectId = req.params.projectId;
        const userId = req.user?._id;

        const project = await deleteProject(projectId, userId);

        res.status(200).json({
            message: `Project ${projectId} deleted`,
            project,
        });
    }
);

// @desc Check if user is authorized to update or delete a project
async function isUserAuthorized(
    userId: string | undefined,
    projectId: string
): Promise<void> {
    const sanitizedUserId = sanitizeId(userId);
    const projectToUpdate = await getProjectById(projectId);

    if (sanitizedUserId !== projectToUpdate._id) {
        throw new HttpException('Unauthorized', 401);
    }
}
