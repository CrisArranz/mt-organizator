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
    .populate("match")
    .then(tournament => res.status(200).json(tournament))
    .catch(next);
}

module.exports.create = (req, res, next) => {
  
  function calculateRounds(players) {
    return players - (1 - players % 2);
  }

  function pairings(players, tournamentId) {
    const pairings = [];
    const participants = [...players];

    for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
    }

    for (let round = 1; round <= participants.length; round++) {
      if (round > 1) {
        const firstPlayer = participants[0];
        participants.shift();
        participants.push(firstPlayer);
      }
    
      for (let i = 0; i < participants.length; i += 2) {
        if (i === participants.length - 1) {
        } else {
          pairings.push(new Promise((resolve, reject) => {
            Match
              .create({
                tournament: tournamentId,
                player_one: participants[i],
                player_two: participants[i + 1],
                round: round
              })
              .then(() => resolve())
              .catch(() => reject())
          }));
        }
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