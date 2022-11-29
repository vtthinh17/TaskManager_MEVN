const { ObjectId } = require("mongodb");
class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractUserData(payload) {
        const user = {
            name: payload.name,
			email: payload.email,
			address:payload.address,
			phone: payload.phone,
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            {$set: {}},
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async find(filter){
		const cursor = await this.User.find(filter);
		return await cursor.toArray();
	}

	async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
	
	async findByName(name){
		return await this.find({
			name: {$regex: new RegExp(name), $options: "i"}
		});
	}

	async findById(id) {
		return await this.User.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}

	async delete (id){
		const result = await this.User.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,}		
		);
		return result.value;
	}

}
module.exports = UserService;