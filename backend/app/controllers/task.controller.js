const TaskService = require("../services/task.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../middleware/api-errors");

exports.create = async (req, res, next) => {
	if(!req.body?.description){
		return next(new ApiError(400,"Description can not be empty"));
	}
	try {
		const taskService = new TaskService(MongoDB.client);
		const document = await taskService.create(req.body);
		return res.send(document);
	}catch(error){
		return next(
			new ApiError(500, "An error occurred while creating the task")
		);
	}
};
exports.delete = async (req, res, next) =>{
	try{
		const taskService = new TaskService(MongoDB.client);
		// Get TaskID
		const document = await taskService.delete(req.params.id, req.body);
		if(!document){
			return next(new ApiError(404, "Task not found")); 
		}
		return res.send({message: "Task was deleted successfully"});
	}
	catch(error){
		return next(
		new ApiError(500,`Could not delete task with id=${req.params.id}`)
		);
	}
};

exports.update = async (req, res, next) =>{
	try{
		const taskService = new TaskService(MongoDB.client);
		const document = await taskService.update(req.params.id, req.body);
		if(!document){
			return next(new ApiError(404, "Task not found")); 
		}
		return res.send({message: "Task was updated successfully"});
	}catch(error){
		return next(
		new ApiError(500,`Error updating task with id=${req.params.id}`)
		);
	}
};




exports.findByUserId = async (req, res, next) =>{
	try{
		const taskService = new TaskService(MongoDB.client);
		const document = await taskService.findByUserId(req.params.id);
		return res.send(document);
	}
	catch(error){
		return next(
		new ApiError(500,"An error occurred while retrieving favorite tasks")
		);
	}
};