<template>
  <div>
    <h1 class="mb-5 text-center">Espace membre</h1>
    <div v-if="user">
      <div id="overlay1">
        <div class="popup_block">
          <a class="close" href="#noWhere"
            ><img
              alt="Fermer"
              title="Fermer la fenêtre"
              class="button_close"
              src="/static/images/close_pop.png"
          /></a>
          <h2>Supprimer votre compte</h2>
          <form
            action="/member/<%= member.member_id %>/delete"
            method="post"
            class="mt-5"
          >
            <div class="form-group">
              <div class="container-champ">
                <label for="password">Mot de passe :</label>
                <input type="text" class="form-field" id="password" />
              </div>
            </div>
            <p>
              Attention, la supression de votre compte est définitive et
              iréverssible. Vous perdrez toutes les données qui y sont associés.
            </p>
            <button type="submit" class="button button-danger button-send">
              Supprimer
            </button>
          </form>
        </div>
      </div>

      <div class="account-infos">
        <h2 id="center-text">Paramètres du compte</h2>
        <form id="form1">
          <div class="form-group">
            <label for="form-first_name">Nom d'utilisateur :</label>
            <input
              type="text"
              class="form-field"
              id="form-first_name"
              placeholder="Prénom"
              :value="user.first_name ? user.first_name : ''"
            />
            <input
              type="text"
              class="form-field"
              id="form-last_name"
              placeholder="Nom"
              :value="user.last_name ? user.last_name : ''"
            />

            <div class="container-champ">
              <label for="form-nickname">Pseudo :</label>
              <input
                type="text"
                class="form-field"
                id="form-nickname"
                placeholder="Pseudo"
                :value="user.nickname ? user.nickname : ''"
              />
            </div>
            <div class="container-champ">
              <label for="form-age">Age :</label>
              <input
                type="text"
                class="form-field"
                id="form-age"
                placeholder="Age"
                :value="user.age ? user.age : ''"
              />
            </div>
            <div class="container-champ">
              <label for="form-email">Adresse mail :</label>
              <input
                type="text"
                class="form-field"
                id="form-email"
                placeholder="Adresse mail"
                :value="user.email ? user.email : ''"
              />
            </div>
            <div class="container-champ">
              <label for="form-phone_number">Téléphone :</label>
              <input
                type="text"
                class="form-field"
                id="form-phone_number"
                placeholder="Numéro de téléphone"
                :value="user.phone_number ? user.phone_number : ''"
              />
            </div>
          </div>
          <div class="container-champ">
            <label for="delete-account">Compte :</label>
            <a href="#overlay1" class="btn btn-danger element-margin"
              >Supprimer votre compte</a
            >
          </div>
          <div class="container-champ">
            <label for="phoneNumber">Sauvegarder :</label>
            <button
              type="button"
              class="btn btn-success element-margin"
              @click="update"
            >
              Enregistrer vos modifications
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />
  </div>
</template>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
* {
  color: $light;
}
legend {
  padding: 0px 3px;
  font-weight: bold;
  font-variant: small-caps;
}

label {
  min-width: 200px;
  display: inline-block;
  vertical-align: top;
  margin: 6px;
}
.form-control {
  background: $background-element;
}

.account-infos {
  margin-top: 1%;
  margin-bottom: 1%;
  width: 98%;
  margin-left: 1%;
  background-color: $background-element;
  border: 1px solid;
  border-radius: 5px;
}
.editor {
  max-width: 70%;
  margin-left: 15%;
}
.form-field {
  width: 30%;
  margin-left: 5%;
  border: 1px solid;
  border-radius: 7px;
  border-color: grey;
  background: $background-element;
}

.container-champ {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.avatar-field {
  margin-left: 5%;
}
#change-password {
  margin-left: 10px;
}
.button-send {
  margin-left: 5px;
  margin-bottom: 5px;
}
.element-margin {
  margin-left: 5%;
}
.element-margin-10 {
  margin-left: 10%;
}

/* Form avatar */
.invisible {
  display: none;
}
#avatar-form {
  width: 64px;
  border-radius: 32px;
}
#center-text {
  text-align: center;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

#overlay1 {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
#overlay1:target {
  display: block;
}
.popup_block {
  background: #fff;
  padding: 20px;
  border: 20px solid #ddd;
  position: relative;
  margin: 10% auto;
  width: 40%;
  box-shadow: 0px 0px 20px #000;
  border-radius: 10px;
}
img.button_close {
  float: right;
  margin: -55px -55px 0 0;
}

@media screen and (max-width: 700px) {
  .container-champ {
    flex-direction: column;
  }
  .form-field {
    width: 90%;
    margin-left: 2px;
    margin-top: 2px;
  }
  .popup_block {
    width: 98%;
  }
  .editor {
    max-width: 90%;
    margin-left: 5%;
  }
}
</style>

<script>
export default {
  name: "user_settings",
  data() {
    return {
      user: null,
    };
  },
  async beforeMount() {
    function getCookie(cname) {
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
    }
    const user_id = getCookie("user_auth");
    if (user_id) {
      const res = await fetch(
        this.$store.state.host + "api/v1/members/" + user_id,
        {
          credentials: "include",
          withCredentials: true,
        }
      );
      const result = await res.json();
      if (result && result.status === "success") this.user = result.result;
    }
  },
  methods: {
    async update() {
      const body = JSON.stringify({
        nickname: document.getElementById("form-nickname").value,
        first_name: document.getElementById("form-first_name").value,
        last_name: document.getElementById("form-last_name").value,
        age: document.getElementById("form-age").value,
        phone_number: document.getElementById("form-phone_number").value,
        email: document.getElementById("form-email").value,
      });
      const responce = await fetch(
        `${this.$store.state.host}api/v1/members/${this.user.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
          body: body,
        }
      );
      const result = await responce.json();
      if (result && result.status === "success") this.$router.push("/member");
    },
  },
};
</script>