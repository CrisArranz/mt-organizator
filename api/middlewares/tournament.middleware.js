const createError = require("http-errors");
const { Tournament } = require("../models");

module.exports.existsTournament = (req, res, next) => {
  const { idTournament } = req.params;
  Tournament
    .findById(idTournament)
    .then((tournament) => {
      if (tournament) {
        req.tournament = tournament;
        next();
      } else {
        next(createError(404, "Tournament is not found"));
      }
    })
    .catch(next)
}