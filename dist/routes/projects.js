"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectsController = require("../controllers/projectsController");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    projectsController.getAllProjects(req, res, next);
}),
    router.get("/:projectId", (req, res, next) => {
        projectsController.getProject(req, res, next);
    }),
    router.post("/", (req, res, next) => {
        projectsController.createProject(req, res, next);
    }),
    router.put("/:projectId", (req, res, next) => {
        projectsController.updateProject(req, res, next);
    }),
    router.delete("/:projectId", (req, res, next) => {
        projectsController.deleteProject(req, res, next);
    });
exports.default = router;
