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
    <div class="container">
      <Header />
    </div>
    
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
