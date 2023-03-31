require('dotenv/config');

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");

require('./config/db.config');
const { initSession, loadUser } = require("./config/session.config");
const routes = require("./config/routes.config");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(initSession);
app.use(loadUser);

app.use("/api/v1", routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError || error.status === 400){
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError){
    error = createError(404, "Resources not found");
  }
  data.message = error.message;
  res.status(error.status).json(data);
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.info(`The app is running in port ${PORT}`));

module.exports = app;