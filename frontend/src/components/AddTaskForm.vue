<template>
    <form @submit="submitContact">
        <div class="form-group">
            <label for="description">Mô tả</label>
            <input type="text" name="" id="">
            <!-- <input type="text" name="description" id="description" v-model="taskLocal.description"> -->
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Thêm mới <i class="fa-solid fa-plus"></i></button>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        task: { type: Object, required: true }
    },
    emits: ["submit:contact"],
    data() {
        return {
            taskLocal: this.task,
            }
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.taskLocal);
        },
    }
}
</script>