const express = require("express");
const app = express();
const projects = require("./routes/projects-api");

const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  console.log("Hello World");
  res.redirect("/api");
});

app.use("/api", projects);

app
  .get("/api", (req, res) => {
    res.send("Hello World <h1> from Express </h1>");
  })
  .listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
  .on("error", err => {
    console.log(err);
  })
  .on("listening", () => {
    console.log("Server started on port 5000");
  })
  .on("close", () => {
    console.log("Server closed");
  })
  .on("connection", () => {
    console.log("Connection established");
  });

module.exports = app;
