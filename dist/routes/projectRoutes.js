"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");
const { getAllProjectsHandler, getProjectByIdHandler, createProjectHandler, updateProjectHandler, deleteProjectHandler, } = projectController;
const projectRoutes = express_1.default.Router();
projectRoutes
    .route("/")
    .get(getAllProjectsHandler)
    .post(authMiddleware_1.protect, createProjectHandler);
projectRoutes
    .route("/:projectId")
    .get(getProjectByIdHandler)
    .put(authMiddleware_1.protect, updateProjectHandler)
    .delete(authMiddleware_1.protect, deleteProjectHandler);
exports.default = projectRoutes;
