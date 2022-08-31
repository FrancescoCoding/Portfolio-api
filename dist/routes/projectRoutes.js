"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController = require("../controllers/projectController");
const { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler, } = projectController;
const projectRoutes = express_1.default.Router();
projectRoutes
    .route("/projects")
    .get(getAllProjectsHandler)
    .post(createProjectHandler),
    projectRoutes
        .route("/projects/:projectId")
        .get(getProjectByIdHandler)
        .put(updateProjectHandler)
        .delete(deleteProjectHandler);
exports.default = projectRoutes;
