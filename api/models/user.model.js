const bcrypt = require("bcryptjs");
const { EMAIL_PATTERN, WORK_FACTOR, PW_PATTERN, SUPER_ADMIN } = require("../config/constants.config")

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "The email is required",
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, "The email is not valid"]
  },
  password: {
    type: String,
    required: "The password is required",
    trim: true,
    match: [PW_PATTERN, "The password need to have at least 8 characters"]
  },
  nickname: {
    type: String,
    trim: true,
    unique: true,
    required: "The nickname is required"
  },
  name: {
    type: String,
    trim: true,
    maxLength: [30 , "The name cannot have more than 30 characters"],
    minLength: [3 , "The name need at least 3 characters"],
    required: "El nombre es obligatorio"
  },
  surname: {
    type: String,
    trim: true,
    maxLength: [60 , "Los apellidos no puede tener más de 60 caracteres"],
    minLength: [3 , "Los apellidos necesita mínimo 3 caracteres"],
    required: "Los apellidos son obligatorios"
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/dp520ozjl/image/upload/v1680343730/mt-organizator/icon-image-not-found-free-vector_ixa88v.webp',
    validate: {
      validator: function(image){
        try {
          new URL(image);
          return true;
        } catch(error){
          return false;
        }
      },
    }
  },
  isAdmin: Boolean,
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
      delete ret.email;
      ret.tournaments = ret.tournament?.map(tournament => ({ name: tournament.name, id: tournament.id }))
      delete ret.tournament;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
});

userSchema.virtual("tournament" , {
  ref: "tournament",
  localField: "_id",
  foreignField: "players"
})

userSchema.pre('save', function (next) {
  this.isAdmin = SUPER_ADMIN === this.email;
  if (this.isModified('password')) {
    bcrypt.hash(this.password, WORK_FACTOR)
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next)
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToMatch) {
  return bcrypt.compare(passwordToMatch, this.password)
}

const User = mongoose.model("user", userSchema);
module.exports = User;