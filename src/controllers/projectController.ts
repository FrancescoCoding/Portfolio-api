import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";

//@desc Get all projects
//@route GET /api/v1/projects
//@access Public
exports.getAllProjectsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  }
);

//@desc Get a single project by id
//@route GET /api/projects/:projectId
//@access Public
exports.getProjectByIdHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    const project = await getProjectById(projectId);

    res.status(200).json({ project });
  }
);

//@desc Create a project
//@route POST /api/projects
//@access Private
exports.createProjectHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectBody = req.body;

    const createdProject = await createProject(projectBody);

    res.status(201).json({ createdProject });
  }
);

//@desc Update a project
//@route PUT /api/projects/:projectId
//@access Private
exports.updateProjectHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;
    const projectBody = req.body;

    const project = await updateProject(projectId, projectBody);

    res.status(200).json({ project });
  }
);

//@desc Delete a project
//@route DELETE /api/projects/:projectId
//@access Private
exports.deleteProjectHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    const project = await deleteProject(projectId);

    res.status(200).json({ message: `Project ${projectId} deleted`, project });
  }
);
