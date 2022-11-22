<script>
export default {
    props: {
        users: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
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
                <th>Number of tasks</th>
            </tr>
        </thead>
        <tbody  v-for="(user, index) in users" :key="user._id" :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)">
            <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.phone }}</td>
                <td>
                  
                </td>
                <td>
                    <router-link :to="{
                        name: 'user.task',
                        params: { id: user._id },
                    }">
                        <span >
                            <i class="fas fa-edit"></i> Xem tasks</span>
                    </router-link>

                </td>
            </tr>
        </tbody>
    </table>
</template>


    