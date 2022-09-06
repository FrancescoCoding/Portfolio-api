import { Schema } from 'mongoose';
import { ProjectType } from '../types/projectTypes';

export interface IProjectSchema extends ProjectType {
    _id: string;
}

const ProjectSchema = new Schema<ProjectType>(
    {
        userId: {
            type: String,
            required: [true, 'User ID is required'],
        },
        name: {
            unique: true,
            type: String,
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
    },
    {
        timestamps: true,
    }
);

export default ProjectSchema;
