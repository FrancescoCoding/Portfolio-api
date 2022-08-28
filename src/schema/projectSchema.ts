import { Schema } from "mongoose";
import { ProjectBody } from "../types/projectTypes";

export interface IProjectSchema extends ProjectBody {
  _id: string;
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
