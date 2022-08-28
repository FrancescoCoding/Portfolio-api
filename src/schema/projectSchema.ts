import { Schema } from "mongoose";
import { ProjectBody } from "../types/projectTypes";

export interface IProjectSchema extends ProjectBody {
  projectId: string;
}

const ProjectSchema = new Schema<ProjectBody>(
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
