const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  tournament: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "tournament"
  },
  player_one: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  player_two: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  result: Object,
  round: Number
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;