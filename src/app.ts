import express from "express";
import bodyParser from "body-parser";

import projectsRoutes from "./routes/projects";

const app = express();

app.use(bodyParser.json());

app.use(projectsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
