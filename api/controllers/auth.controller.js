const createError = require("http-errors");
const { User } = require("../models");

module.exports.register = (req, res, next) => {

  const { email, password, nickname, name, surname } = req.body;

  const userInfo = { email, password, nickname, name, surname };

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
          .create(userInfo)
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next);
}

module.exports.login = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { password: { message: "Email/Nickname or password incorrect" } }
      })
    )
  }

  const { email, password } = req.body;

  User
    .findOne({ $or: [{ email }, { nickname: email }] })
    .then((user) => {
      if (!user) {
        invalidAuthError();
      } else {
        return user
          .checkPassword(password)
          .then((match) => {
            if (match) {
              req.session.userId = user.id
              res.status(200).json(user);
            } else {
              invalidAuthError();
            }
          })
      }
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
}