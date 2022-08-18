"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getProjects = void 0;
let projects = [];
// Create and export getProjects function and process get request to /projects with req res and next parameters
const getProjects = () => {
    return projects;
};
exports.getProjects = getProjects;
// Create and export getProjectById function and process get request to /projects/:projectId with req res and next parameters
const getProjectById = (projectId) => {
    return projects.find(p => p.projectId === projectId);
};
exports.getProjectById = getProjectById;
