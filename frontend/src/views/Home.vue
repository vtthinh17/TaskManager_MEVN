<template>
    <div class="page row">
        <div >
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="headline-page">
                Danh sách user
                <i class="fa-sharp fa-solid fa-users"></i>
            </h4>
            <UserList v-if="filteredUsersCount > 0" :users="filteredUsers" @delete:user="refreshList()"/>
            <p style="color:red" v-else>Không có User nào.</p>
        </div>
        
        <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="goToAddUser()">
                    <i class="fas fa-plus"></i> Thêm User mới
                </button>
        </div>

    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
import TaskService from '@/services/task.service';
export default {
    components: {
        InputSearch,
        UserList,
    },
    data() {
        return {
            users: [],
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        userStrings() {
            return this.users.map((user) => {
                const { name, email, address, phone } = user;
                return [name, email, address, phone].join("");
            });
        },
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
                // get totalTask of each User
                this.users.forEach(
                    async (user) => {
                        // get ListTask of User by UserID
                        let totalTask = await TaskService.getByUserId(user._id);
                        // khoi tao bien de truy xuat length of totalTask
                        user.totalTask = totalTask.length;
                    }
                );
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
            // this.activeIndex = -1;
        },
        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    min-width: 750px;
}
</style>
