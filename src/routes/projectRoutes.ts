import express from "express";
import { protect } from "../middleware/authMiddleware";

const projectController = require("../controllers/projectController");

const {
  getAllProjectsHandler,
  getProjectByIdHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} = projectController;

const projectRoutes = express.Router();

projectRoutes
  .route("/")
  .get(getAllProjectsHandler)
  .post(protect, createProjectHandler);
projectRoutes
  .route("/:projectId")
  .get(getProjectByIdHandler)
  .put(protect, updateProjectHandler)
  .delete(protect, deleteProjectHandler);

export default projectRoutes;
