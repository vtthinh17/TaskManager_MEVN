const express = require("express");
const tasks = require("../controllers/task.controller");
const router = express.Router();
// User routes
router.route("/")
    .get(tasks.findAll)

router.route("/:id")
    .get(tasks.findByUserId)

module.exports = router;
