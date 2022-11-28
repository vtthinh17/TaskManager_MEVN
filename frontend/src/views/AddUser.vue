<template>
    <div class="page">
       <h4 class="headline-page">Thêm mới User</h4>
       <AddUserForm 
       :user="user" 
       @submit:user="addUser" 
       />
       <p class="message">{{ message }}</p>
   </div>
</template>
<script>
import AddUserForm from "@/components/AddUserForm.vue";
import UserService from "./../services/user.service";
export default {
   // Dang ky component de su dung tren template
   components: {
       AddUserForm,
   },
   data() {
       return {
           user: {},
           message: "",
       };
   },
   methods: {
       async addUser(data) {
           try {
               await UserService.create(data);
               this.message = "User được thêm thành công.";
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
