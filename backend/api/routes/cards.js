const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const UserCardController = require("../controllers/usercards");

router.get("/", checkAuth, UserCardController.getUserCards);

router.post("/", checkAuth, UserCardController.createUserCard);

router.get("/:userCardId", checkAuth, UserCardController.getUserCard);

router.patch("/:userCardId", checkAuth, UserCardController.updateUserCard);

router.delete("/:userCardId", checkAuth, UserCardController.deleteUserCard);

module.exports = router;
