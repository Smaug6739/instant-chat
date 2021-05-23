<template>
  <div id="login">
    <div id="container">
      <h3>Connexion à votre compte</h3>
      <div class="user-input-wrp">
        <br />
        <input
          type="text"
          id="form-username"
          class="mb-3 form-control inputText"
          autocomplete="off"
          required
        />
        <span class="floating-label">Your username</span>
      </div>
      <div class="user-input-wrp">
        <br />
        <input
          type="password"
          id="form-password"
          class="mb-3 form-control inputText"
          autocomplete="off"
          required
        />
        <span class="floating-label">Your password</span>
      </div>
      <div id="error"></div>
      <div class="btns">
        <button type="button" class="btn btn-primary" @click="connect">
          Login
        </button>
        <router-link to="/member/register"
          >You don't have an account ?</router-link
        >
      </div>
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
        if (this.$socket.io.engine) {
          this.$socket.io.engine.close();
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

#container {
  // background-color: $background-element-light;
  max-width: 40%;
  display: block;
  border: 1px groove white;
  border-radius: 5px;
  padding: 0 2em 2em 2em;
  // -webkit-box-shadow: 2px 2px 2px 2px black;
  // box-shadow: 2px 2px 2px 2px black;
  text-align: center;
  margin: auto;
  margin-top: 8%;
}
.btns {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  button,
  a {
    margin: 10px 10px 10px 10px;
  }
  button {
    width: 90%;
    margin: auto;
    border-radius: 1.5rem;
  }
}
.floating-label {
  color: #757575;
  font-weight: 500;
  font-size: 1.1rem;
}
.user-input-wrp {
  position: relative;
  width: 100%;
}
.user-input-wrp .inputText {
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #777;
  box-shadow: none !important;
}
.user-input-wrp .inputText:focus {
  border-color: blue;
  border-width: medium medium 2px;
}
.user-input-wrp .floating-label {
  position: absolute;
  pointer-events: none;
  top: 26px;
  left: 10px;
  transition: 0.2s ease all;
}
.user-input-wrp input:focus ~ .floating-label,
.user-input-wrp input:not(:focus):valid ~ .floating-label {
  top: 0px;
  left: 10px;
  font-size: 13px;
  opacity: 1;
}
input {
  background-color: transparent;
  color: #eee;
  outline: none;
  outline-style: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border: solid #eee 1px !important;
  padding: 3px 10px;
  border-radius: 0;
  width: 100% !important;
}
input:focus {
  border-bottom: solid #fff 1px !important;
}
</style>