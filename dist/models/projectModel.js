"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema_1 = __importDefault(require("../schema/projectSchema"));
const ProjectModel = (0, mongoose_1.model)('Project', projectSchema_1.default);
exports.default = ProjectModel;
