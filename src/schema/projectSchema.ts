import { Schema } from "mongoose";
import { ProjectType } from "../types/projectTypes";

export interface IProjectSchema extends ProjectType {
  projectId: string;
}

const ProjectSchema = new Schema<ProjectType>(
  {
    name: {
      unique: true,
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default ProjectSchema;
