const express = require("express");
const router = express.Router();

const { user } = require("../controllers");
const { secure } = require("../middlewares");

router.get("/users", secure.isAdmin, user.getUsers);
router.get("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);
router.patch("/user/:nickname", secure.isLogged, secure.isYourAccount, user.getUser);

module.exports = router;