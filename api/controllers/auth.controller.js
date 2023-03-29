const createError = require("http-errors");
const { User } = require("../models");

module.exports.register = (req, res, next) => {

  const { email, password, nickname, name, surname } = req.body;

  const user = { email, password, nickname, name, surname };

  User
    .findOne({$or: [{ email },{ nickname }]})
    .then(user => {
      if (user) {
        next(
          createError(400, {
            message: "User validation failed",
            errors: { email: { message: "Email or nickname already register" } }
          })
        )
      } else {
        return User
          .create(user)
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next);
}