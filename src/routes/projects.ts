import express from "express";

const projectsController = require("../controllers/projectsController");

const projectsRoutes = express.Router();

projectsRoutes.get("/projects", (req, res, next) => {
  projectsController.getAllProjects(req, res, next);
}),
  projectsRoutes.get("/projects/:projectId", (req, res, next) => {
    projectsController.getProject(req, res, next);
  }),
  projectsRoutes.post("/projects", (req, res, next) => {
    projectsController.createProject(req, res, next);
  }),
  projectsRoutes.put("/projects/:projectId", (req, res, next) => {
    projectsController.updateProject(req, res, next);
  }),
  projectsRoutes.delete("/projects/:projectId", (req, res, next) => {
    projectsController.deleteProject(req, res, next);
  });

export default projectsRoutes;
