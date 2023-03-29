const express = require("express");
const router = express.Router();

const { user, tournament } = require("../controllers");
const { secure } = require("../middlewares");

router.get("/users", secure.isAdmin, user.getUser);
router.get("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);
router.patch("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);

router.get("/tournaments", secure.isAdmin, tournament.getTournament);
router.get("/tournament/:idTournament", secure.isAdmin, tournament.getTournament);

module.exports = router;