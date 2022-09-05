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
exports.projectController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectService_1 = require("../services/projectService");
// @desc Get all projects
// @route GET /api/v1/projects
// @access Public
const getAllProjectsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield (0, projectService_1.getAllProjects)();
    res.status(200).json(projects);
}));
// @desc Get a single project by id
// @route GET /api/projects/:projectId
// @access Public
const getProjectByIdHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const project = yield (0, projectService_1.getProjectById)(projectId);
    res.status(200).json({ project });
}));
// @desc Create a project
// @route POST /api/projects
// @access Private
const createProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectBody = req.body;
    const createdProject = yield (0, projectService_1.createProject)(projectBody);
    res.status(201).json({ createdProject });
}));
// @desc Update a project
// @route PUT /api/projects/:projectId
// @access Private
const updateProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const projectBody = req.body;
    const project = yield (0, projectService_1.updateProject)(projectId, projectBody);
    res.status(200).json({ project });
}));
// @desc Delete a project
// @route DELETE /api/projects/:projectId
// @access Private
const deleteProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const project = yield (0, projectService_1.deleteProject)(projectId);
    res.status(200).json({
        message: `Project ${projectId} deleted`,
        project,
    });
}));
exports.projectController = {
    getAllProjectsHandler,
    getProjectByIdHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
};
