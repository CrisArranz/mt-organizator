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
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})

const Tournament = mongoose.model("tournament", tournamentSchema);
module.exports = Tournament;