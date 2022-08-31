import express from "express";

const projectController = require("../controllers/projectController");

const {
  getAllProjectsHandler,
  getProjectByIdHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} = projectController;

const projectRoutes = express.Router();

projectRoutes.route("/").get(getAllProjectsHandler).post(createProjectHandler),
  projectRoutes
    .route("/:projectId")
    .get(getProjectByIdHandler)
    .put(updateProjectHandler)
    .delete(deleteProjectHandler);

export default projectRoutes;
