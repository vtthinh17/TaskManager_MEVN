const express = require("express");
const cors = require("cors");
const usersRouter = require("./app/routes/user.route");
const tasksRouter = require("./app/routes/task.route");
const ApiError = require("./app/middleware/api-errors");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users',usersRouter);
app.use('/api/tasks',tasksRouter);


app.use((req, res, next) => {
    return next(new ApiError(404,"Resource not found"));
});
app.use((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});
module.exports = app;