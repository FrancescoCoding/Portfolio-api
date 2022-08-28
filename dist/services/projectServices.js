"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.createProject = exports.getAllProjects = void 0;
const db_1 = require("../database/db");
const projectModel_1 = __importDefault(require("../models/projectModel"));
function getAllProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield projectModel_1.default.find();
            if (!projects) {
                throw new Error("Projects not found");
            }
            return projects;
        }
        catch (error) {
            throw new Error("Projects not found");
        }
    });
}
exports.getAllProjects = getAllProjects;
function createProject(project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newProject = yield projectModel_1.default.create(project);
            if (!newProject) {
                throw new Error("Project could not be created");
            }
            return newProject;
        }
        catch (error) {
            throw new Error("Error creating the project");
        }
    });
}
exports.createProject = createProject;
function getProjectById(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, db_1.isObjectIdValid)(projectId);
            const project = yield projectModel_1.default.findById(projectId);
            if (!project) {
                throw new Error("Project could not be found");
            }
            return project;
        }
        catch (error) {
            throw new Error("Error finding the project");
        }
    });
}
exports.getProjectById = getProjectById;
function updateProject(projectId, project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, db_1.isObjectIdValid)(projectId);
            const updatedProject = yield projectModel_1.default.findByIdAndUpdate(projectId, project, { new: true });
            if (!updatedProject) {
                throw new Error("Project could not be updated");
            }
            return updatedProject;
        }
        catch (error) {
            throw new Error("Error updating the project");
        }
    });
}
exports.updateProject = updateProject;
function deleteProject(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, db_1.isObjectIdValid)(projectId);
            const project = yield projectModel_1.default.findByIdAndDelete(projectId);
            if (!project) {
                throw new Error("Project could not be deleted");
            }
            return;
        }
        catch (error) {
            throw new Error("Error deleting the project");
        }
    });
}
exports.deleteProject = deleteProject;