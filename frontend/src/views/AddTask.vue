<template>
    <div class="page">
       <h4>Thêm mới Task</h4>
       <AddTaskForm 
       :task="task" 
       @submit:addTask="addTask" 
       />
       <p>{{ message }}</p>
   </div>
</template>
<script>
import AddTaskForm from "@/components/AddTaskForm.vue";
import TaskService from "./../services/task.service";
export default {
   // Dang ky component de su dung tren template
   components: {
    AddTaskForm,
   },
   data() {
       return {
           task: {},
           message: "",
       };
   },
   methods: {
       async addTask(data) {
           try {
               await TaskService.create(data);
               this.message = "Task mới được thêm thành công.";
           } catch (error) {
               console.log(error);
           }
       },
   },
   created() {

       this.message = "";
   },
};
</script>
