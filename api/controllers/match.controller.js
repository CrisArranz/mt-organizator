const { Match } = require("../models");

module.exports.getMatch = (req, res, next) => {
  const criterial = {};
  const { idMatch } = req.params;

  if (idMatch) {
    criterial._id = idMatch;
  }

  Match
    .find(criterial)
    .then(match => {
      res.status(200).json(match);
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { idMatch } = req.params;
  const { result } = req.body;

  Match
    .findByIdAndUpdate(idMatch, { result }, { new: true, runValidators: true })
    .then((match) => res.status(200).json(match))
    .catch(next)
}