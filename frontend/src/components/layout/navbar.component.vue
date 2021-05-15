<template>
  <nav id="menu" class="navbar navbar-expand-md navbar-dark navigation-bar">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-target="#navbarCollapse"
      data-bs-target="#navbarToggleExternalContent"
      aria-controls="navbarToggleExternalContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse stroke"
      id="navbarToggleExternalContent"
    >
      <ul class="navbar-nav ms-auto">
        <li class="nav-li">
          <router-link to="/" class="nav-link">ACCUEIL</router-link>
        </li>
        <li class="nav-li">
          <router-link to="/vps" class="nav-link">VPS</router-link>
        </li>
        <li class="nav-li">
          <router-link to="/about" class="nav-link">HOSTING</router-link>
        </li>
        <li v-if="userAuth">
          <span class="btn btn-outline-primary" @click="disconnect"
            >Déconnexion</span
          >
        </li>
        <li v-else class="nav-li nav-item">
          <router-link class="btn btn-outline-primary" to="/member/login"
            >Connexion</router-link
          >
          <router-link
            class="btn btn-outline-primary margin-5-right"
            to="/member/register"
            >Inscription</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return { userAuth: this.getCookie("user_auth") };
  },
  methods: {
    fold() {
      document
        .getElementById("navbarToggleExternalContent")
        .classList.remove("show");
    },

    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    async disconnect() {
      await fetch(`${this.$store.state.host}api/v1/members/disconnection`, {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      }).then(async (r) => {
        console.log(await r.json());
        this.$router.push("/");
        this.userAuth = false;
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../../public/scss/theme-variables";
nav {
  background-color: $layout-color;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-active {
      color: #42b983;
    }
  }
}
.btn {
  margin-left: 5px;
  margin-right: 5px;
}
.router-link-exact-active {
  color: red;
}
#logo {
  margin-left: 5px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
</style>