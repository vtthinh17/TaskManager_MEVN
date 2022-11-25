<template>
   <h4 class="headline-page">List Tasks of User</h4>

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