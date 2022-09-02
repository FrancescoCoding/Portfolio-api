import { model } from 'mongoose';
import ProjectSchema, { IProjectSchema } from '../schema/projectSchema';

const ProjectModel = model<IProjectSchema>('Project', ProjectSchema);

export default ProjectModel;
