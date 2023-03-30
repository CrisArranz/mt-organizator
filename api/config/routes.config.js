const express = require("express");
const router = express.Router();

const { user, tournament, auth } = require("../controllers");
const { secure } = require("../middlewares");

router.post("/register", auth.register);


router.get("/users", secure.isAdmin, user.getUser);
router.get("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);
router.patch("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);

router.get("/tournaments", secure.isAdmin, tournament.getTournament);
router.get("/tournament/:idTournament", secure.isAdmin, tournament.getTournament);
router.post("/tournament/new", secure.isAdmin, tournament.create);

module.exports = router;