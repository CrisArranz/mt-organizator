const express = require("express");
const router = express.Router();

const { user, tournament, auth, match } = require("../controllers");
const { secure, tournamentSecure, userSecure } = require("../middlewares");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.delete("/logout", secure.isLogged, auth.logout);


router.get("/users", secure.isLogged, secure.isAdmin, user.getUser);
router.get("/users/:nickname", secure.isLogged, secure.isYourAccountOrAdmin, userSecure.getUserCriterial, user.getUser);
router.patch("/users/:nickname", secure.isLogged, secure.isYourAccountOrAdmin, userSecure.getUserCriterial, userSecure.existsUnique, user.updateUser);

router.get("/tournaments", secure.isLogged, secure.isAdmin, tournament.getTournament);
router.get("/tournaments/:idTournament", secure.isAdmin, tournament.getTournament);
router.delete("/tournaments/:idTournament", secure.isAdmin, tournamentSecure.existsTournament, tournament.deleteTournament);
router.post("/tournaments", secure.isLogged, secure.isAdmin, tournament.create);

router.get("/matches", secure.isLogged, secure.isAdmin, match.getMatch);
router.get("/matches/:idMatch", secure.isLogged, match.getMatch);
router.patch("/matches/:idMatch", secure.isLogged, secure.isAdmin, match.update);

module.exports = router;