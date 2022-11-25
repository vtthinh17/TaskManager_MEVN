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
            { $set: { isComplete: task.isComplete, } },
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
        // console.log(id);
		return await this.find({userId: id});
	}

	// async update (id){
	// 	console.log('abbbbbbbbbbbbbb',id)
	// 	const filter = {
	// 		_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
	// 	};
	// 	const result = await this.Task.findOneAndUpdate(
	// 		filter,{$set : {isComplete:!isComplete}}, {returnDocument: "after"}
	// 	);
	// 	return result.value;
	// }
	async update (id){
		const task = await this.Task.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		
		const result = await this.Task.update(
			filter,{$set : {isComplete:true}}, {returnDocument: "after"}
		);
		console.log(result);
		return result.value;
	}

	async delete (id){
		const result = await this.Task.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,}		
		);
		return result.value;
	}

	// async getTotalTask(userId){
	// 	return await this.find({userId: id}).length;
	// }


}
module.exports = TaskService;