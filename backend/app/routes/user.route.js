const express = require("express");
const users = require("../controllers/user.controller");
const router = express.Router();
// User routes
router.route("/")
    .get(users.findAll)
    .post(users.create)

router.route("/:id")
    .get(users.findOne)
    .delete(users.delete);
module.exports = router;
