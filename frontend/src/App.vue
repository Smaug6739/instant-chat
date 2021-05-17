<template>
  <div id="app">
    <main role="main" style="flex: 1 0 auto">
      <Navbar />
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/layout/navbar.component.vue";
import Footer from "@/components/layout/footer.component.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.$socket.on("MESSAGE_CREATE", (msg) => {
      console.log("Un message a été posté : " + msg);
    });
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
