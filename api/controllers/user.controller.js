const createError = require("http-errors");
const { User } = require("../models");

module.exports.getUser = (req, res, next) => {
  const { criterial } = req;

  User
    .find(criterial)
    .populate({
      path: "tournament",
      populate: {
        path: "match"
      }
    })
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
  const { userSearch } = req;

  Object.assign(userSearch, req.body);

  userSearch
    .save()
    .then((user) => {
      delete req.userSearch;
      if (user) {
        res.status(200).json(user);
      } else {
        next(createError(404, "Error in user's update"));
      }
    })
    .catch(next);
}