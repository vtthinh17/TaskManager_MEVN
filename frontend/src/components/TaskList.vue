<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>STT</th>
                <th>Decriptions</th>
                <th>Complete?</th>               
            
            </tr>
        </thead>

        <!-- <tbody v-for="(task, index) in tasks" :key="task.id" :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)">
            <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ task.description }}</td>
                <td><input type="checkbox" name="isComplte" value="isComplete"></td>          
            </tr>
        </tbody> -->

        <tbody>
            <tr v-for="(task, index) in taskLists" :key="task.id">
                <td>{{index + 1}}</td>
                <td>{{task.description}}</td>
                <td><input type="checkbox" :checked="task.isComplete" name="" id="">Done</td>
            </tr>        
        </tbody>
        
        <h5 style="color:green">
            Progress:{{(totalDone / (taskLists.length > 0 ? taskLists.length : 1) * 100).toFixed(2)}}%
             
        </h5>

        <button class="btn btn-primary"  @click="goToAddTask">Assign new task</button>
        
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
        async getTask(id){
            this.taskLists = await TaskService.getByUserId(id);
            this.taskLists.forEach((task) => {
                if(task.isComplete) {
                    this.totalDone++;
                }
            })
        },
    }
}
</script>   