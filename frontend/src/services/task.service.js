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
        // return (await this.api.post("/", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
   
    // async addTask(id, data) {
    //     return (await this.api.post(`/${id}`, data)).data;
    // }
}
export default new TaskService();