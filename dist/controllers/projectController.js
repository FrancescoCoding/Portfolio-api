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
exports.deleteProjectHandler = exports.updateProjectHandler = exports.createProjectHandler = exports.getProjectByIdHandler = exports.getAllProjectsHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSanitizer_1 = require("../sanitizers/userSanitizer");
const projectService_1 = require("../services/projectService");
const httpException_1 = __importDefault(require("../utils/httpException"));
// @desc Get all projects
// @route GET /api/v1/projects
// @access Public
exports.getAllProjectsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield (0, projectService_1.getAllProjects)();
    res.status(200).json(projects);
}));
// @desc Get a single project by id
// @route GET /api/projects/:projectId
// @access Public
exports.getProjectByIdHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    const project = yield (0, projectService_1.getProjectById)(projectId);
    res.status(200).json({ project });
}));
// @desc Create a project
// @route POST /api/projects
// @access Private
exports.createProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const projectBody = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const createdProject = yield (0, projectService_1.createProject)(projectBody, userId);
    res.status(201).json({ createdProject });
}));
// @desc Update a project
// @route PUT /api/projects/:projectId
// @access Private
exports.updateProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const projectId = req.params.projectId;
    const projectBody = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    yield isUserAuthorized(userId, projectId);
    const project = yield (0, projectService_1.updateProject)(projectId, projectBody, userId);
    res.status(200).json({ project });
}));
// @desc Delete a project
// @route DELETE /api/projects/:projectId
// @access Private
exports.deleteProjectHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const projectId = req.params.projectId;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const project = yield (0, projectService_1.deleteProject)(projectId, userId);
    res.status(200).json({
        message: `Project ${projectId} deleted`,
        project,
    });
}));
// @desc Check if user is authorized to update or delete a project
function isUserAuthorized(userId, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sanitizedUserId = (0, userSanitizer_1.sanitizeId)(userId);
        const projectToUpdate = yield (0, projectService_1.getProjectById)(projectId);
        if (sanitizedUserId !== projectToUpdate._id) {
            throw new httpException_1.default('Unauthorized', 401);
        }
    });
}
