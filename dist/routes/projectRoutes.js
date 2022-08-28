"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectsController = require("../controllers/projectsController");
const projectsRoutes = express_1.default.Router();
projectsRoutes.get("/projects", (req, res, next) => {
    projectsController.getAllProjectsHandler(req, res, next);
}),
    projectsRoutes.get("/projects/:projectId", (req, res, next) => {
        projectsController.getProjectByIdHandler(req, res, next);
    }),
    projectsRoutes.post("/projects", (req, res, next) => {
        projectsController.createProjectHandler(req, res, next);
    }),
    projectsRoutes.put("/projects/:projectId", (req, res, next) => {
        projectsController.updateProjectHandler(req, res, next);
    }),
    projectsRoutes.delete("/projects/:projectId", (req, res, next) => {
        projectsController.deleteProjectHandler(req, res, next);
    });
exports.default = projectsRoutes;
