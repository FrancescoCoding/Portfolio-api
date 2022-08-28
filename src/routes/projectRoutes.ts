import express from "express";

const projectsController = require("../controllers/projectsController");

const projectsRoutes = express.Router();

projectsRoutes.get("/projects", (req, res, next) => {
  projectsController.getAllProjectsHandler(req, res, next);
}),
  projectsRoutes.get("/projects/:projectId", (req, res, next) => {
    projectsController.getProjectByIdHandler(req, res, next);
  }),
  projectsRoutes.post("/projects", (req, res, next) => {
    projectsController.createProjectHandler(req, res, next);
  }),
  projectsRoutes.put("/projects/:projectId", (req, res, next) => {
    projectsController.updateProjectHandler(req, res, next);
  }),
  projectsRoutes.delete("/projects/:projectId", (req, res, next) => {
    projectsController.deleteProjectHandler(req, res, next);
  });

export default projectsRoutes;
