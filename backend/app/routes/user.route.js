const express = require("express");
const users = require("../controllers/user.controller");
const tasks = require("../controllers/task.controller");
const router = express.Router();
// User routes
router.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);

router.route("/favorite")
    .get(users.findAllFavorite);

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);
// Task routes
router.route("/:id/tasks")
    .get(tasks.findByUserId)
// router.route("/:id/tasks/add")
//     .put(users.insertTask)

module.exports = router;
