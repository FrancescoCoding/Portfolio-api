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
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
// Project model and schema
const Project = require("../models/project");
//@desc   Get all projects
//@route  GET /api/v1/projects
//@access Public
exports.getAllProjects = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield Project.find();
    res.status(200).json(projects);
}));
//@desc Get a single project
//@route GET /api/projects/:projectId
//@access Public
exports.getProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const project = yield Project.findById(params.projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    res.status(200).json({ project });
}));
//@desc Create a project
//@route POST /api/projects
//@access Private
exports.createProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body) {
        res.status(400);
        throw new Error("Project body is required");
    }
    const project = yield Project.create(body);
    if (!project) {
        res.status(400);
        throw new Error("Project could not be created");
    }
    res.status(201).json({ project });
}));
//@desc   Update a project
//@route  PUT /api/projects/:projectId
//@access Private
exports.updateProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const body = req.body;
    const project = yield Project.findByIdAndUpdate(params.projectId, body, {
        new: true,
        runValidators: true,
    });
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
}));
//@desc   Delete a project
//@route  DELETE /api/projects/:projectId
//@access Private
exports.deleteProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const project = yield Project.findByIdAndDelete(params.projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted" });
}));
