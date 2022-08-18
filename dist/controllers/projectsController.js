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
const projects = [
    {
        projectId: "1",
        name: "Project 1",
        description: "This is project 1",
    },
];
exports.getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ projects });
});
exports.getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const project = projects.find(p => p.projectId === params.projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
});
exports.createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newProject = {
        projectId: new Date().toISOString(),
        name: body.name,
        description: body.description,
    };
    projects.push(newProject);
    res.status(201).json({ message: "Project added", project: newProject });
});
exports.updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const body = req.body;
    const project = projects.find(p => p.projectId === params.projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    project.name = body.name;
    project.description = body.description;
    res.status(200).json({ project });
});
