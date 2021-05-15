<template>
  <div id="form-inscription">
    <h1 class="mb-5 text-center">S'inscrire :</h1>
    <form id="form_register">
      <div class="form-group">
        <fieldset class="form-group">
          <legend>Vos identifiants :</legend>
          <br />
          <label for="pseudo">Pseudo : *</label>
          <input
            type="text"
            class="form-control"
            id="form-nickname"
            name="pseudo"
            placeholder="Pseudo"
          />
          <label for="password1">Mot de passe : *</label>
          <input
            type="text"
            class="form-control"
            id="form-password"
            name="password1"
            placeholder="Mot de passe"
          />
          <label for="password2">Confirmez le mot de passe : *</label>
          <input
            type="text"
            class="form-control"
            name="password2"
            placeholder="Confirmez le mot de passe."
          />
        </fieldset>
        <fieldset class="form-group">
          <legend>Vos informations :</legend>
          <br />
          <label for="lastName">Nom :</label>
          <input
            type="text"
            class="form-control"
            id="form-first_name"
            name="lastName"
            placeholder="Nom"
          />
          <label for="firstName">Prénom :</label>
          <input
            type="text"
            class="form-control"
            id="form-last_name"
            name="firstName"
            placeholder="Prénom"
          />
          <label for="age">Age : *</label>
          <input
            type="text"
            class="form-control"
            id="form-age"
            name="age"
            placeholder="Age"
          />
          <label for="email">Email : *</label>
          <input
            type="text"
            class="form-control"
            id="form-email"
            name="email"
            placeholder="Email"
          />
          <label for="phoneNumber">Téléphone :</label>
          <input
            type="text"
            class="form-control"
            id="form-phone_number"
            name="phoneNumber"
            placeholder="Téléphone"
          />
          <p>
            <input
              type="checkbox"
              class="form-check-input"
              required
              id="check"
            />
            J'ai lu et j'accepte les conditions générales d'utilisation.
          </p>

          <button type="button" class="btn btn-primary" @click="post">
            Inscription
          </button>
        </fieldset>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
#form-inscription {
  padding: 15px;
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

<script>
export default {
  name: "Register page",
  methods: {
    async post() {
      console.log("post");
      const body = JSON.stringify({
        nickname: document.getElementById("form-nickname").value,
        avatar: "default.png",
        password: document.getElementById("form-password").value,
        first_name: document.getElementById("form-first_name").value,
        last_name: document.getElementById("form-last_name").value,
        age: document.getElementById("form-age").value,
        phone_number: document.getElementById("form-phone_number").value,
        email: document.getElementById("form-email").value,
      });
      const responce = await fetch("http://192.168.0.30:3000/api/v1/members", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
        body: body,
      });
      const result = await responce.json();
      if (result && result.status === "success")
        this.$router.push("/member/login");
      else console.log("error");
    },
  },
};
</script>