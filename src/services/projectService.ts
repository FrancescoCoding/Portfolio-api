import ProjectModel from "../models/projectModel";
import { ProjectBody } from "../types/projectTypes";
import { IProjectSchema } from "../schema/projectSchema";
import { isObjectIdValid } from "../database/db";
import { sanitizeProject } from "../sanitizers/projectSanitizer";

export async function getAllProjects(): Promise<ProjectBody[]> {
  try {
    const projects = await ProjectModel.find();

    if (!projects) {
      throw new Error("Projects not found");
    }

    return projects;
  } catch (error) {
    throw new Error(`Projects not found: ${error}`);
  }
}

export async function createProject(
  project: ProjectBody
): Promise<ProjectBody> {
  const sanitizedProject = sanitizeProject(project);

  try {
    const newProject = await ProjectModel.create(sanitizedProject);

    if (!newProject) {
      throw new Error("Project could not be created");
    }

    return newProject;
  } catch (error) {
    throw new Error(`Error creating the project: ${error}`);
  }
}

export async function getProjectById(
  projectId: string
): Promise<IProjectSchema> {
  isObjectIdValid(projectId);

  try {
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      throw new Error("Project could not be found");
    }

    return project;
  } catch (error) {
    throw new Error(`Error finding the project: ${error}`);
  }
}

export async function updateProject(
  projectId: string,
  project: ProjectBody
): Promise<IProjectSchema> {
  isObjectIdValid(projectId);

  const sanitizedProject = sanitizeProject(project);

  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      sanitizedProject,
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project could not be updated");
    }

    return updatedProject;
  } catch (error) {
    throw new Error(`Error updating the project: ${error}`);
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  isObjectIdValid(projectId);

  try {
    const project = await ProjectModel.findByIdAndDelete(projectId);

    if (!project) {
      throw new Error("Project could not be deleted");
    }

    return;
  } catch (error) {
    throw new Error(`Error deleting the project: ${error}`);
  }
}
