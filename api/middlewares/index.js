module.exports = {
  secure: require("./secure.middleware"),
  tournamentSecure: require("./tournament.middleware"),
  userSecure: require("./user.middleware")
}