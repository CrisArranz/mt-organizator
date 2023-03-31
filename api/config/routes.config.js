const express = require("express");
const router = express.Router();

const { user, tournament, auth } = require("../controllers");
const { secure } = require("../middlewares");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.delete("/logout", secure.isLogged, auth.logout);


router.get("/users", secure.isLogged, secure.isAdmin, user.getUser);
router.get("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);
router.patch("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);

router.get("/tournaments", secure.isLogged, secure.isAdmin, tournament.getTournament);
router.get("/tournament/:idTournament", secure.isAdmin, tournament.getTournament);
router.post("/tournaments", secure.isLogged, secure.isAdmin, tournament.create);

module.exports = router;