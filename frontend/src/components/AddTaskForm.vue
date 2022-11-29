<template>
    <form>
        <div class="form-group">
            <label for="description" >Description</label>
            <input type="text" name="description" id="description" v-model="taskLocal.description" placeholder="Mô tả công việc?">
        </div>
        <div class="form-group">
            <button @click="submitTask" type="button" class="btn btn-primary">Thêm mới <i class="fa-solid fa-plus"></i></button>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        task: { type: Object, required: true },
        addTask: {type: Function, required: true}
    },
    emits: ["submit:addTask"],
    data() {
        return {
            taskLocal: this.task,
            }
    },
    methods: {
        submitTask() {          
            this.taskLocal.userId = this.$route.params.id;
            this.$emit('submit:addTask', this.taskLocal);
            // clear input field
            this.taskLocal.description ="";
        },
    }
}
</script>