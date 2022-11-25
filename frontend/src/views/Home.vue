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
            <UserList v-if="filteredUsersCount > 0" :users="filteredUsers" v-model:activeIndex="activeIndex" />
            <p style="color:red" v-else>Không có User nào.</p>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        InputSearch,
        UserList,
    },
    data() {
        return {
            users: [],
            activeIndex: -1,
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
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },
        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddContact() {
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
