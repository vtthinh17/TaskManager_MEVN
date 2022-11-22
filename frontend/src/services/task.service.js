import createApiClient from "./api.service";
class TaskService {
    constructor(baseUrl = "/api/tasks") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getByUserId(id) {
        return (await this.api.get(`${id}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async addTask(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new TaskService();