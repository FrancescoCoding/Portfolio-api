"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeProject = void 0;
const httpException_1 = __importDefault(require("../utils/httpException"));
function sanitizeProject(body) {
    let sanitizedProject = {};
    sanitizedProject.name = removeScriptTags(titleSanitizer(body.name));
    sanitizedProject.description = removeScriptTags(descriptionSanitizer(body.description));
    return sanitizedProject;
}
exports.sanitizeProject = sanitizeProject;
function titleSanitizer(title) {
    if (!title) {
        throw new httpException_1.default("Project name is required", 400);
    }
    if (typeof title !== "string") {
        throw new httpException_1.default("Project name must be a string", 400);
    }
    title = title.trim();
    if (title.length < 3 || title.length > 50) {
        throw new httpException_1.default("Project name must be between 3 and 50 characters", 400);
    }
    return removeScriptTags(title.replace(/[<>]/g, ""));
}
function descriptionSanitizer(description) {
    if (!description) {
        throw new httpException_1.default("Project description is required", 400);
    }
    if (typeof description !== "string") {
        throw new httpException_1.default("Project description must be a string", 400);
    }
    description = description.trim();
    if (description.length < 3 || description.length > 200) {
        throw new httpException_1.default("Project description must be between 3 and 200 characters", 400);
    }
    return removeScriptTags(description.replace(/[<>]/g, ""));
}
function removeScriptTags(userInput) {
    if (userInput.includes("<script>")) {
        throw new httpException_1.default("User inputs cannot contain <script> tags 😡", 418);
    }
    if (userInput.includes("<") && userInput.includes(">")) {
        throw new httpException_1.default("User inputs cannot contain html tags 😡", 418);
    }
    return userInput.replace(/<[^>]*>/g, "").trim();
}
