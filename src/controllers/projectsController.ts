import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");

// Project model and schema
import ProjectModel from "../models/projectModel";
import { ProjectBody, ProjectParams } from "../types/projectTypes";

//@desc   Get all projects
//@route  GET /api/v1/projects
//@access Public
exports.getAllProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await ProjectModel.find();
    res.status(200).json(projects);
  }
);

//@desc Get a single project
//@route GET /api/projects/:projectId
//@access Public
exports.getProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as ProjectParams;

    const project = await ProjectModel.findById(params.projectId);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json({ project });
  }
);

//@desc Create a project
//@route POST /api/projects
//@access Private
exports.createProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as ProjectBody;

    if (!body) {
      res.status(400);
      throw new Error("Project body is required");
    }

    const project = await ProjectModel.create(body);

    if (!project) {
      res.status(400);
      throw new Error("Project could not be created");
    }

    res.status(201).json({ project });
  }
);

//@desc   Update a project
//@route  PUT /api/projects/:projectId
//@access Private
exports.updateProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as ProjectParams;
    const body = req.body as ProjectBody;

    const project = await ProjectModel.findByIdAndUpdate(
      params.projectId,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  }
);

//@desc   Delete a project
//@route  DELETE /api/projects/:projectId
//@access Private
exports.deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as ProjectParams;

    const project = await ProjectModel.findByIdAndDelete(params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted" });
  }
);
