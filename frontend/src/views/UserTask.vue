<template>
   <h4 class="headline-page"><span class="title">List Tasks of User</span></h4>
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