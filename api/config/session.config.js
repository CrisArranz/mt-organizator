const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const { User } = require("../models");

module.exports.initSession = expressSession({
  secret: process.env.SESSION_SECRET || "Session secret",
  resave: false,
  saveUninitialized: false,
  store: mongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 24 * 60 * 60
  }),
  cookie: {
    secure: process.env.SESSION_SECURE === "true",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
});

module.exports.loadUser = (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    User
      .findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(next)
  } else {
    next();
  }
}