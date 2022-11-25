<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>STT</th>
                <th>Decriptions</th>
                <th>Status</th>
                <th>Delete?</th>               
            
            </tr>
        </thead>

        <tbody>
            <tr v-for="(task, index) in taskLists" :key="task.id">
                <td>{{index + 1}}</td>
                <td>{{task.description}}</td>
                <td><input type="checkbox" :checked="task.isComplete" name="" id="" @click="completeTask(task._id)">Done</td>
                <td><button @click="deleteTask(task._id)"><i class="fa-solid fa-arrow-left"></i>Delete this task<i class="fa-solid fa-trash-can"></i></button></td>
            </tr>        
        </tbody>
        
        <h5 style="color:green">
            Progress:{{(totalDone / (taskLists.length > 0 ? taskLists.length : 1) * 100).toFixed(2)}}%
             
        </h5>

        <button class="btn btn-primary"  @click="goToAddTask">Assign new task<i class="fa-solid fa-plus"></i></button>
        
    </table>
</template>
<script>
import TaskService from '../services/task.service';
export default{
    data() {
        return {
            totalDone:0,
            taskLists: []
        };
    },
    mounted() {
        let userId = this.$route.params.id;
        this.getTask(userId);
    },
    methods:{
        goToAddTask() {
            this.$router.push({ name: "task.add" });
        },
        async completeTask(id){
            console.log('Update isComplete field of TaskId: ',  id)
            try {
                await TaskService.update(id);
                this.updateTotalDone();
                } catch (error) {
                    console.log(error);
                }
        },
        updateTotalDone(){
            this.totalDone=0;
            this.taskLists.forEach((task) => {
                if(task.isComplete) {
                    this.totalDone++;
                }
            })
        },
        async deleteTask(id) {
            try {
                // console.log('Delete TaskId: ',id)
                    await TaskService.delete(id);
                    // refreshList
                    let userId = this.$route.params.id;
                    this.getTask(userId);
                    this.updateTotalDone();
                } catch (error) {
                    console.log(error);
                }
        },
        async getTask(id){
            this.taskLists = await TaskService.getByUserId(id);
            this.updateTotalDone();
        },
    }
}
</script>   