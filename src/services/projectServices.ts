import { isObjectIdValid } from "../database/db";
import ProjectModel from "../models/projectModel";
import { IProjectSchema } from "../schema/projectSchema";
import { ProjectBody } from "../types/projectTypes";

export async function getAllProjects(): Promise<ProjectBody[]> {
  try {
    const projects = await ProjectModel.find();

    if (!projects) {
      throw new Error("Projects not found");
    }

    return projects;
  } catch (error) {
    throw new Error("Projects not found");
  }
}

export async function createProject(
  project: ProjectBody
): Promise<ProjectBody> {
  try {
    const newProject = await ProjectModel.create(project);

    if (!newProject) {
      throw new Error("Project could not be created");
    }

    return newProject;
  } catch (error) {
    throw new Error("Error creating the project");
  }
}

export async function getProjectById(
  projectId: string
): Promise<IProjectSchema> {
  try {
    isObjectIdValid(projectId);

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      throw new Error("Project could not be found");
    }

    return project;
  } catch (error) {
    throw new Error("Error finding the project");
  }
}

export async function updateProject(
  projectId: string,
  project: ProjectBody
): Promise<IProjectSchema> {
  try {
    isObjectIdValid(projectId);

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      project,
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project could not be updated");
    }

    return updatedProject;
  } catch (error) {
    throw new Error("Error updating the project");
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  try {
    isObjectIdValid(projectId);

    const project = await ProjectModel.findByIdAndDelete(projectId);

    if (!project) {
      throw new Error("Project could not be deleted");
    }

    return;
  } catch (error) {
    throw new Error("Error deleting the project");
  }
}
