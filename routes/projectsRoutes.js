const express = require("express");
const router = express.Router();

const projectsController = require("../controllers/projectsController");

router.get("/", projectsController.getProjects);

router.post("/create", projectsController.createProject);

module.exports = router;
