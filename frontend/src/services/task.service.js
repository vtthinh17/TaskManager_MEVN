import createApiClient from "./api.service";
class TaskService {
    constructor(baseUrl = "/api/tasks") {
        this.api = createApiClient(baseUrl);
    }
    async getByUserId(id) {
        return (await this.api.get(`${id}`)).data;
    }
    async create(data) {
        return (await this.api.post("/add", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async update(id) {
        return (await this.api.put(`/${id}`)).data;
    }
   
}
export default new TaskService();