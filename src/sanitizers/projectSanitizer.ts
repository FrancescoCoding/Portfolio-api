import { ProjectType } from '../types/projectTypes';
import { removeScriptTags } from './utils';
import { sanitizeId } from './userSanitizer';
import HttpException from '../utils/httpException';

export function sanitizeProject(
    project: ProjectType,
    userId: string | undefined
): ProjectType {
    const sanitizedId = sanitizeId(userId);

    const sanitizedProject: ProjectType = {
        userId: sanitizedId,
        name: '',
        description: '',
    };

    sanitizedProject.name = removeScriptTags(titleSanitizer(project.name));
    sanitizedProject.description = removeScriptTags(
        descriptionSanitizer(project.description)
    );
    return sanitizedProject;
}

function titleSanitizer(title: string): string {
    if (title === undefined || title === null) {
        throw new HttpException('Project name is required', 400);
    }
    if (typeof title !== 'string') {
        throw new HttpException('Project name must be a string', 400);
    }

    title = title.trim();

    if (title.length < 3 || title.length > 50) {
        throw new HttpException(
            'Project name must be between 3 and 50 characters',
            400
        );
    }

    return removeScriptTags(title.replace(/[<>]/g, ''));
}

function descriptionSanitizer(description: string): string {
    if (description === undefined || description === null) {
        throw new HttpException('Project description is required', 400);
    }
    if (typeof description !== 'string') {
        throw new HttpException('Project description must be a string', 400);
    }

    description = description.trim();

    if (description.length < 3 || description.length > 200) {
        throw new HttpException(
            'Project description must be between 3 and 200 characters',
            400
        );
    }

    return removeScriptTags(description.replace(/[<>]/g, ''));
}
