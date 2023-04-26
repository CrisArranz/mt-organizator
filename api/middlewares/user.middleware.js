const createError = require("http-errors");
const { User } = require("../models");

module.exports.getUserCriterial = (req, res, next) => {
  const { nickname } = req.params;
  const criterial = {};

  if (nickname) {
    if (nickname === "me") {
      criterial.nickname = req.user.nickname;
    } else {
      criterial.nickname = nickname;
    }
  }

  req.criterial = criterial;
  next();
}

module.exports.existsUnique = (req, res, next) => {
  const { email, nickname } = req.body;
  const { criterial } = req;
  User
    .findOne(criterial)
    .then((user) => {
      delete req.criterial;
      req.userSearch = user;
      return User
        .findOne({$or: [{ email: email || "" }, { nickname: nickname || "" }], _id: { $ne: user.id }})
        .then((user) => {
          if (user) {
            delete req.userSearch;
            next(createError(400, "The email or nickname is already in use"));
          } else {
            next();
          }
        })
    })
    .catch(next);
}