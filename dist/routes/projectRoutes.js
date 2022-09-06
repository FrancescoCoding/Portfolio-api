"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const projectController_1 = require("../controllers/projectController");
const projectRoutes = express_1.default.Router();
projectRoutes
    .route('/')
    .get(projectController_1.getAllProjectsHandler)
    .post(authMiddleware_1.protect, projectController_1.createProjectHandler);
projectRoutes
    .route('/:projectId')
    .get(projectController_1.getProjectByIdHandler)
    .put(authMiddleware_1.protect, projectController_1.updateProjectHandler)
    .delete(authMiddleware_1.protect, projectController_1.deleteProjectHandler);
exports.default = projectRoutes;
