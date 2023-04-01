const createError = require("http-errors");
const { User } = require("../models");

module.exports.getUser = (req, res, next) => {
  const criterial = {};
  
  const { nickname } = req.params;

  if (nickname) {
    if (nickname === "me") {
      criterial.nickname = req.user.nickname;
    } else {
      criterial.nickname = nickname;
    }
  }

  User
    .find(criterial)
    .populate("tournament")
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports.updateUser = (req, res, next) => {
  const { email, password, nickname, name, surname, photo } = req.body;

  const user = { email, password, nickname, name, surname, photo };

  User
    .findByIdAndUpdate("xxxxxxx", user, { new: true, runValidators: true })
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        next(createError(404, "Error in user's update"));
      }
    })
    .catch(next);
}