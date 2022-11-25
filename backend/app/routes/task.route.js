const express = require("express");
const tasks = require("../controllers/task.controller");
const router = express.Router();

router.route("/:id")
    .get(tasks.findByUserId)
    .delete(tasks.delete)
    .put(tasks.update) 
    
    
router.route("/add")
    .post(tasks.create)
    
    

module.exports = router;
