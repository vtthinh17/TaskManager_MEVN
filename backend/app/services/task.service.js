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
        // console.log(id);
		return await this.find({userId: id});
	}

	// async update (id, payload){
	// 	const filter = {
	// 		_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
	// 	};
	// 	const update = this.extractTaskData(payload);
	// 	const result = await this.Task.findOneAndUpdate(
	// 		filter,{$set : update}, {returnDocument: "after"}
	// 	);
	// 	return result.value;
	// }

	async delete (id){
		const result = await this.Task.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,}		
		);
		return result.value;
	}

	// async findFavorite(){
	// 	return await this.find({favorite: true});
	// }

	// async deleteAll(){
	// 	const result = await this.Task.deleteMany({});
	// 	return result.deletedCount;
	// }
}
module.exports = TaskService;