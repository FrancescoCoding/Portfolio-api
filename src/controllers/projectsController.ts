import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const Project = require("../models/project");

type ProjectBody = {
  name: string;
  description: string;
};
type ProjectParams = {
  _id: string;
};

//@desc   Get all projects
//@route  GET /api/v1/projects
//@access Public
exports.getAllProjects = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    Project.collection.drop();

    const projects = await Project.find();
    res.status(200).json(projects);
  }
);

//@desc   Get a single project
//@route  GET /api/projects/:_id
//@access Public
exports.getProject = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const params = req.params as ProjectParams;

    const project = await Project.findById(params._id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  }
);

//@desc   Create a project
//@route  POST /api/projects
//@access Public
exports.createProject = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const body = req.body as ProjectBody;

    const project = await Project.create(body);

    if (!project) {
      return res.status(400).json({ message: "Project not created" });
    }

    res.status(201).json({ project });
  }
);

// exports.updateProject = asyncHandler(
//   async (req: Request, res: Response, next: any) => {
//     const params = req.params as ProjectParams;
//     const body = req.body as ProjectBody;

//     const project = projects.find(p => p.projectId === params.projectId);

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     project.name = body.name;
//     project.description = body.description;

//     res.status(200).json({ project });
//   }
// );
