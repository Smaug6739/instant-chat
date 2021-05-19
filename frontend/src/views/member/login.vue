<template>
  <div id="login">
    <div class="header__bg"></div>
    <div id="container">
      <form>
        <h4>Connexion à votre compte</h4>
        <label for="form-username">Pseudo :</label>
        <input
          type="text"
          id="form-username"
          class="form-control mb-3"
          placeholder="Pseudo"
          required
          autofocus
        />
        <label for="form-password">Mot de passe :</label>
        <input
          type="password"
          id="form-password"
          class="form-control mb-3"
          placeholder="Password"
          required
          name="pass"
        />
        <div id="error"></div>
        <div class="btns">
          <button type="button" class="btn btn-success" @click="connect">
            Se connecter
          </button>
          <router-link to="/member/register"
            >You don't have an account ?</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "View login",
  methods: {
    async connect() {
      const content = JSON.stringify({
        username: document.getElementById("form-username").value,
        password: document.getElementById("form-password").value,
      });
      const responce = await fetch(
        `${this.$store.state.host}api/v1/members/auth`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: content,
          credentials: "include",
          withCredentials: true,
        }
      );
      const result = await responce.json();
      if (result.result && result.result.auth) {
        for (const obj in result.result.member) {
          localStorage.setItem(obj, result.result.member[obj]);
        }
        if (!this.$route.query.redirect) this.$router.push("/chats");
        else this.$router.push(this.$route.query.redirect);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
#login {
  position: relative;
}
#container {
  background-color: $background-element-light;
  width: 45%;
  display: block;
  border: 1px groove white;
  border-radius: 5px;
  padding: 0 2em 2em 2em;
  -webkit-box-shadow: 2px 2px 2px 2px black;
  box-shadow: 2px 2px 2px 2px black;
  margin: auto;
  margin-top: 8%;
}
.btns {
  button,
  a {
    margin: 10px 10px 10px 0px;
  }
}
</style>