const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: {
    type: String,
    maxLength: [50, "The name cannot have more than 50 characters"],
    minLength: [5, "the name need to have at least 5 characters"],
    required: true
  },
  players: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "user"
  },
  rounds: Number
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      ret.matches = ret.match?.reduce((matches, match) => {
        const infoMatch = { player_one: match.player_one, player_two: match.player_two, round: match.round, id: match.id };
        if (matches[match.round ? match.round : "notPlayed"]) {
          matches[match.round ? match.round : "notPlayed"].push(infoMatch);
        } else {
          matches[match.round ? match.round : "notPlayed"] = [infoMatch]    ;
        }
        return matches;
      },{});
      delete ret.match;
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
});

tournamentSchema.virtual("match", {
  ref: "match",
  localField: "_id",
  foreignField: "tournament"
});

const Tournament = mongoose.model("tournament", tournamentSchema);
module.exports = Tournament;