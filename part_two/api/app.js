const express = require("express");
const cors = require("cors");
const compression = require("compression");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/survey_templates", require("./routes/surveyTemplates"));
app.use("/api/completed_surveys", require("./routes/completedSurveys"));

module.exports = app;
