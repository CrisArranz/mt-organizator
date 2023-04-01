const createError = require("http-errors");
const { User } = require("../models");

module.exports.getUser = (req, res, next) => {
  const { criterial } = req;

  User
    .find(criterial)
    .populate("tournament")
    .then(user => {
      delete req.criterial;
      if (user.length === 1) {
        res.status(200).json(user[0]);
      } else {
        res.status(200).json(user);
      }
    })
    .catch(next)
}

module.exports.updateUser = (req, res, next) => {
  const { userToUpdate } = req;
  const { email, password, nickname, name, surname, photo } = req.body;

  const user = { email, password, nickname, name, surname, photo };

  User
    .findByIdAndUpdate(userToUpdate, user, { new: true, runValidators: true })
    .then(user => {
      if (user) {
        delete req.userToUpdate;
        res.status(200).json(user);
      } else {
        delete req.userToUpdate;
        next(createError(404, "Error in user's update"));
      }
    })
    .catch(next);
}