const express = require("express");
const app = express();
const projects = require("./routes/projects-api");

const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  // send filed from dist/index.html
  res.sendFile(__dirname + "/dist/index.html");
  // res.redirect("/api");
});

// app.use("/api", projects);

app
  .use("/api", (req, res) => {
    // respond with a view of the endpoint and the projects
    res.send(`<h1>API</h1>
    <ul>
      <li><a href="/api/projects">/api/projects</a></li>
    </ul>`);
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
