<template>
  <div id="app">
    <!--<Navbar />-->
    <router-view />
    <!--<Footer />-->
  </div>
</template>
<script>
//import Navbar from "@/components/layout/navbar.component.vue";
//import Footer from "@/components/layout/footer.component.vue";

export default {
  name: "App",
  components: {
    //Navbar,
    //Footer,
  },
};
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
a {
  text-decoration: none;
  &.router-link-active {
    color: white;
  }
  color: rgb(170, 170, 170);
}
</style>
