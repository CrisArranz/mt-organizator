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

  if (email || nickname) {
    User
      .find(criterial)
      .then((user) => {
        delete req.criterial;
        req.userToUpdate = user[0]?.id;
        return User
          .findOne({$or: [{ email: email || "" }, { nickname: nickname || "" }], _id: { $ne: user[0].id }})
          .then((user) => {
            if (user) {
              next(createError(400, "The email or nickname is already in use"));
            } else {
              next();
            }
          })
      })
      .catch(next);
  } else {
    next();
  }
}