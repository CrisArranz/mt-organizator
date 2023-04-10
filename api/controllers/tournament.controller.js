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

  function pairings(players, tournamentId, totalRounds) {
    const pairings = [];
    const participants = players.length % 2 === 0 ? [...players] : [...players, null];
    
    const numberParticipants = participants.length;

    for (let round = 0; round < totalRounds; round++) {
      for (let i = 0; i < Math.floor(numberParticipants / 2); i++) {
        if (participants[i] && participants[numberParticipants - 1 - i]) {
          pairings.push(new Promise((resolve, reject) => {
            Match
              .create({
                tournament: tournamentId,
                player_one: participants[i],
                player_two: participants[numberParticipants - 1 - i],
                round: round + 1
              })
              .then(() => resolve())
              .catch(() => reject())
          }));
        }
      }
      participants.splice(1, 0, participants.pop());
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
    .then(() => {
      return Match
        .deleteMany({ tournament: id })
        .then(() => res.status(204).send())
    })
    .catch(next);
}