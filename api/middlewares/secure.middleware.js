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

module.exports.isConfirmed = (req, res, next) => {
  if (req.user?.isConfirm) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isYourAccountOrAdmin = (req, res, next) => {
  const { nickname } = req.params;
  ;
  if (nickname === req.user?.nickname || nickname === "me" || req.user?.isAdmin) {
    next();
  } else {
    next(createError(401));
  }
}