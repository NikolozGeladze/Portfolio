//! -------- IMPORTS --------
const express = require("express");
const cors = require("cors");

//! -------- INITIALIZATION --------
const app = express();

//! -------- MIDDLEWARE --------
app.use(cors());
app.use(express.json());

//! -------- ROUTES --------
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/skills", require("./routes/skillRoutes"));
// app.use("/api/packages", require("./routes/packageRoutes"));
// app.use("/api/reviews", require("./routes/reviewRoutes"));

module.exports = app;