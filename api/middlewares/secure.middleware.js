const createError = require("http-errors")

module.exports.isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isLogged = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isYourAccount = (req, res, next) => {
  const { nickname } = req.params;
  ;
  if (nickname === req.user?.nickname || nickname === "me") {
    next();
  } else {
    next(createError(401));
  }
}