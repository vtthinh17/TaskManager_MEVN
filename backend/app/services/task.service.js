const { ObjectId } = require("mongodb");
class TaskService {
    constructor(client) {
        this.Task = client.db().collection("tasks");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractTaskData(payload) {
        const task = {
            userId: payload.userId,
			description: payload.description,
			isComplete:payload.isComplete,
        };
        // Remove undefined fields
        Object.keys(task).forEach(
            (key) => task[key] === undefined && delete task[key]
        );
        return task;
    }
    async create(payload) {
        const task = this.extractTaskData(payload);
        const result = await this.Task.findOneAndUpdate(
            task,
            { $set: { isComplete: task.isComplete === true, } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter){
		const cursor = await this.Task.find(filter);
		return await cursor.toArray();
	}

	
	async findById(id) {
		return await this.Task.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
    async findByUserId(id){
		return await this.find({userId: id});
	}


	async update (id){
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		};
		const obj = await this.findById(id);
		const status = !obj.isComplete;
		const result = await this.Task.findOneAndUpdate(
			filter,{$set : {isComplete:status}}, {returnDocument: "after"}
		);
		return result.value;
	}

	async delete (id){
		const result = await this.Task.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,}		
		);
		return result.value;
	}


}
module.exports = TaskService;