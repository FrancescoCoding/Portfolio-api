import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import { connectDB } from "./database/db";
import projectsRoutes from "./routes/projects";

connectDB();

const app = express();

app.use(bodyParser.json());

app.use("/api", projectsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
