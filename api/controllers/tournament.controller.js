const { Tournament } = require("../models");

module.exports.getTournament = (req, res, next) => {
  const criterial = {};

  const { idTournament } = req.params;

  if (idTournament) {
    criterial.id = idTournament;
  }

  Tournament
    .find(criterial)
    .then(tournament => res.status(200).json(tournament))
    .catch(next)
}