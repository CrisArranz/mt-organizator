const createError = require("http-errors");
const { Tournament, User } = require("../models");

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

module.exports.existsPlayers = (req, res, next) => {
  const { players } = req.body;
  const playersTournament = players.map((player) => new Promise((resolve, reject) => {
    User
      .findById(player)
      .then((user) => {
        if (user) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => reject());
  }));

  Promise.all(playersTournament)
  .then(() => {
    next();
  })
  .catch(() => next(createError(403, "One or more User don't exists")));
}