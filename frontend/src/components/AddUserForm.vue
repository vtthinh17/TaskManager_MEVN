<template>
    <form>
        <fieldset>
            <div class="form-group">
                <label for="name">Họ tên</label>
                <input type="text" name="name" id="name" v-model="userLocal.name">
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" name="email" id="email" v-model="userLocal.email">
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input type="text" name="address" id="address" v-model="userLocal.address">
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" v-model="userLocal.phone">
            </div>
            <div class="form-group">
                <button @click="submitUser" type="button" class="btn btn-primary">Thêm mới <i
                        class="fa-solid fa-plus"></i></button>
            </div>
        </fieldset>
    </form>
</template>
<script>
export default {
    props: {
        user: { type: Object, required: true },
        addUser: { type: Function, required: true }
    },
    emits: ["submit:addUser"],
    data() {
        return {
            userLocal: this.user,
        }
    },
    methods: {
        submitUser() {
            this.$emit("submit:addUser", this.userLocal);
            // clear input field
            this.userLocal.name = "";
            this.userLocal.email = "";
            this.userLocal.address = "";
            this.userLocal.phone = "";
        },
    }
}
</script>