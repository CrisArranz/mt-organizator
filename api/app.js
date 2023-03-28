require("dotenv/config");
require('./config/db.config');

const express = require("express");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));

const routes = require("./config/routes.config");

app.use("/v1/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.info(`The app is running in port ${PORT}`));