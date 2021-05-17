<template>
  <div id="container">
    <form id="form_login">
      <div id="margin-container">
        <fieldset class="form-group">
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
          <button type="button" class="btn btn-success" @click="connect">
            Se connecter
          </button>
        </fieldset>
      </div>
    </form>
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
          this.$router.push("/chats");
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (min-width: 500px) {
  #container {
    display: block;
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    width: 50%;
  }
}
fieldset.form-group {
  border: 1px groove black !important;
  border-radius: 2px;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}
</style>