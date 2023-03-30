const createError = require("http-errors");
const { Tournament } = require("../models");

module.exports.getTournament = (req, res, next) => {
  const criterial = {};

  const { idTournament } = req.params;

  if (idTournament) {
    criterial._id = idTournament;
  }

  Tournament
    .find(criterial)
    .populate("players")
    .then(tournament => res.status(200).json(tournament))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  
  function calculateRounds(players) {
    return players - (1 - players % 2)
  }

  const { name, players } = req.body;

  const tournament = { name, players, rounds: calculateRounds(players.length) };

  if (players.length < 2) {
    next(createError(400, "Error, the tournament need at leats 2 players"));
  }

  if (players.length !== [...new Set(players)].length) {
    next(createError(400, "Error, the players cannot be duplicated"));
  }

  if (players.length >= 2 && players.length === [...new Set(players)].length) {
    Tournament
      .create(tournament)
      .then(tournament => res.status(201).json(tournament))
      .catch(next)
  }
}