const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const projects = require("./routes/projectsRoutes");

// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use("/projects", projects);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
