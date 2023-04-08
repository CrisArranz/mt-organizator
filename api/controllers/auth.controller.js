const createError = require("http-errors");
const { User } = require("../models");
const { sendConfirmationEmail } = require("../config/mailer.config");

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
          .then(user => {
            sendConfirmationEmail(user)
            res.status(201).json(user)
          })
      }
    })
    .catch(next);
}

module.exports.validate = (req, res, next) => {

  const { id } = req.params;

  User
    .findByIdAndUpdate(id, { isConfirm: true }, { new: true, runValidators: true })
    .then(user => {
      if (user) {
        res.status(200).redirect(`${process.env.WEB_URL}/login`);
      } else {
        next(createError(404, "Error in user's update"));
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
        if (!user.isConfirm) {
          return next(createError(401, "Please confirm your account"))
        }
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