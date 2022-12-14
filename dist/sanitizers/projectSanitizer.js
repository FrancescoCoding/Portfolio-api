"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeProject = void 0;
const utils_1 = require("./utils");
const userSanitizer_1 = require("./userSanitizer");
const httpException_1 = __importDefault(require("../utils/httpException"));
function sanitizeProject(project, userId) {
    const sanitizedId = (0, userSanitizer_1.sanitizeId)(userId);
    const sanitizedProject = {
        userId: sanitizedId,
        name: '',
        description: '',
    };
    sanitizedProject.name = (0, utils_1.removeScriptTags)(titleSanitizer(project.name));
    sanitizedProject.description = (0, utils_1.removeScriptTags)(descriptionSanitizer(project.description));
    return sanitizedProject;
}
exports.sanitizeProject = sanitizeProject;
function titleSanitizer(title) {
    if (title === undefined || title === null) {
        throw new httpException_1.default('Project name is required', 400);
    }
    if (typeof title !== 'string') {
        throw new httpException_1.default('Project name must be a string', 400);
    }
    title = title.trim();
    if (title.length < 3 || title.length > 50) {
        throw new httpException_1.default('Project name must be between 3 and 50 characters', 400);
    }
    return (0, utils_1.removeScriptTags)(title.replace(/[<>]/g, ''));
}
function descriptionSanitizer(description) {
    if (description === undefined || description === null) {
        throw new httpException_1.default('Project description is required', 400);
    }
    if (typeof description !== 'string') {
        throw new httpException_1.default('Project description must be a string', 400);
    }
    description = description.trim();
    if (description.length < 3 || description.length > 200) {
        throw new httpException_1.default('Project description must be between 3 and 200 characters', 400);
    }
    return (0, utils_1.removeScriptTags)(description.replace(/[<>]/g, ''));
}
