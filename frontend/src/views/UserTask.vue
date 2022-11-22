<template>
   <h2>List Tasks of User</h2>

    <TaskList/>
     
</template>

<script>
import TaskList from "../components/TaskList.vue";
export default {
    components: {
        TaskList
    },
    props: {
        id: { type: String, required: true },
    },
}
</script>