import express from "express";

const projectsController = require("../controllers/projectsController");

const router = express.Router();

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

export default router;
