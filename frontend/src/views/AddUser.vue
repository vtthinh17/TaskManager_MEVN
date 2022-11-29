<template>
    <div class="page">
       <h4 class="headline-page"><span class="title">Add User Form<i class="fa-solid fa-file-pen"></i></span></h4>
       <AddUserForm 
       :user="user" 
       @submit:addUser="addUser" 
       />
       <p class="message">{{ message }}</p>
   </div>
</template>
<script>
import AddUserForm from "@/components/AddUserForm.vue";
import UserService from "./../services/user.service";
export default {
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
