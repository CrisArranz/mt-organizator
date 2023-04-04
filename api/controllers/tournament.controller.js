const createError = require("http-errors");
const { Tournament, Match } = require("../models");

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
    .catch(next);
}

module.exports.create = (req, res, next) => {
  
  function calculateRounds(players) {
    return players - (1 - players % 2);
  }

  function pairings(players, tournamentId, totalRounds) {
    const pairings = [];
    for (let i = 0; i < players.length; i++) {
      for(let j = i + 1; j < players.length; j++) {
        pairings.push(new Promise((resolve, reject) => {
          Match
            .create({
              tournament: tournamentId,
              player_one: players[i],
              player_two: players[j],
              round: (pairings.length % totalRounds) + 1
            })
            .then(() => resolve())
            .catch(() => reject())
        }))
      }
    }
    return pairings;
  }

  const { name, players } = req.body;
  const totalRounds = calculateRounds(players.length);

  const tournament = { name, players, rounds: totalRounds };

  if (players.length < 2) {
    next(createError(400, "Error, the tournament need at leats 2 players"));
  }

  if (players.length !== [...new Set(players)].length) {
    next(createError(400, "Error, the players cannot be duplicated"));
  }

  if (players.length >= 2 && players.length === [...new Set(players)].length) {
    Tournament
      .create(tournament)
      .then(tournament => {
        return Promise.all(pairings(players, tournament.id, totalRounds))
          .then(() => res.status(201).json(tournament))
      })
      .catch(next);
  }
}

module.exports.deleteTournament = (req, res, next) => {
  const { id } = req.tournament;
  Tournament
    .deleteOne({ _id: id })
    .then(() => res.status(204).send())
    .catch(next);
}