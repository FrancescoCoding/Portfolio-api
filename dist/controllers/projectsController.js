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
const Project = require("../models/project");
//@desc   Get all projects
//@route  GET /api/v1/projects
//@access Public
exports.getAllProjects = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Project.collection.drop();
    const projects = yield Project.find();
    res.status(200).json(projects);
}));
//@desc   Get a single project
//@route  GET /api/projects/:_id
//@access Public
exports.getProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const project = yield Project.findById(params._id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
}));
//@desc   Create a project
//@route  POST /api/projects
//@access Public
exports.createProject = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const project = yield Project.create(body);
    if (!project) {
        return res.status(400).json({ message: "Project not created" });
    }
    res.status(201).json({ project });
}));
// exports.updateProject = asyncHandler(
//   async (req: Request, res: Response, next: any) => {
//     const params = req.params as ProjectParams;
//     const body = req.body as ProjectBody;
//     const project = projects.find(p => p.projectId === params.projectId);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }
//     project.name = body.name;
//     project.description = body.description;
//     res.status(200).json({ project });
//   }
// );
