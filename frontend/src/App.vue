<template>
  <div id="app">
    <!--<Navbar />-->
    <div id="app-loader"></div>
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
@import "../public/scss/theme-variables";
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
  color: $color-end;
}
</style>
