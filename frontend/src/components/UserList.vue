<script>
import UserService from '../services/user.service';
import TaskService from '../services/task.service';
export default {
    props: {
        tasks:{type: Array, default: []},
        users: { type: Array, default: [] },
    },
    emits: ["delete:user"],
    methods: {
        async deleteUser(id) {
            console.log('Delete user:',id);
            if (confirm("Bạn muốn xóa người này ra khỏi danh sách?")) {
                try {
                    await UserService.delete(id);
                    let listTaskOfUser = await TaskService.getByUserId(id);
                    listTaskOfUser.forEach(async task => {
                        await TaskService.delete(task._id);
                    });
                    this.$emit("delete:user");
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },
};
</script>

<template>
    <table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Total tasks</th>
                
            </tr>
        </thead>
        <tbody  v-for="(user, index) in users" :key="user._id" 
            >
            <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.phone }}</td>
                <td>
                    {{user.totalTask}}
                </td>
                <td>
                    <router-link :to="{
                        name: 'user.task',
                        params: { id: user._id },
                    }" class="link">
                        <span >
                            <i class="fa-solid fa-list-check"></i>Xem tasks
                        </span>
                    </router-link>
                </td>
                <td @click="deleteUser(user._id)">
                    <i class="fa-solid fa-trash-can"></i>Xóa user 
                </td>
            </tr>
        </tbody>
    </table>
</template>


    