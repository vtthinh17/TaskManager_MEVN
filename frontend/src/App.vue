<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<template>
  <div id="app">
    <div class="container navbar-style">
      <Header />
    </div>
    
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  #app{
    margin: 0;
    padding: 0;
  }
</style>
