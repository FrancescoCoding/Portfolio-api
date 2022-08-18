import { Project } from "../models/project";
import { Request, Response } from "express";

const projects: Project[] = [
  {
    projectId: "1",
    name: "Project 1",
    description: "This is project 1",
  },
];

type ProjectBody = {
  name: string;
  description: string;
};
type ProjectParams = {
  projectId: string;
};

exports.getAllProjects = async (req: Request, res: Response, next: any) => {
  res.status(200).json({ projects });
};

exports.getProject = async (req: Request, res: Response, next: any) => {
  const params = req.params as ProjectParams;

  const project = projects.find(p => p.projectId === params.projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json({ project });
};

exports.createProject = async (req: Request, res: Response, next: any) => {
  const body = req.body as ProjectBody;

  const newProject: Project = {
    projectId: new Date().toISOString(),
    name: body.name,
    description: body.description,
  };

  projects.push(newProject);
  res.status(201).json({ message: "Project added", project: newProject });
};

exports.updateProject = async (req: Request, res: Response, next: any) => {
  const params = req.params as ProjectParams;
  const body = req.body as ProjectBody;

  const project = projects.find(p => p.projectId === params.projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.name = body.name;
  project.description = body.description;

  res.status(200).json({ project });
};
