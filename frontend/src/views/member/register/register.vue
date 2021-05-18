<template>
  <!-- <div id="form-inscription">
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
  </div> -->
  <div id="container">
    <h3>Création d'un compte</h3>
    <div class="tab none">
      <legend>Vos identifiants :</legend>
      <br />
      <label for="pseudo">Pseudo : *</label>
      <input
        type="text"
        class="form-control required"
        id="form-username"
        name="pseudo"
        placeholder="Pseudo"
        autocomplete="off"
        @keyup="verifyUsername"
      />
      <div id="form-username-error"></div>
      <label for="password1">Mot de passe : *</label>
      <input
        type="password"
        class="form-control required"
        id="form-password1"
        name="password1"
        placeholder="Mot de passe"
        @keyup="verifyStrength('form-password1')"
      />
      <div id="form-password1-error"></div>
      <label for="password2">Confirmez le mot de passe : *</label>
      <input
        type="password"
        class="form-control required"
        name="password2"
        placeholder="Confirmez le mot de passe."
        id="form-password2"
        @keyup="matchPasswords('form-password1', 'form-password2')"
      />
      <div id="form-password2-error"></div>
      <div class="btns">
        <span class="btn btn-primary" @click="nextView">Next</span>
      </div>
    </div>
    <!-------------------------------------------------------------------------->
    <div class="tab none">
      <legend>Vos informations :</legend>
      <label for="lastName">Nom :</label>
      <input
        type="text"
        class="form-control"
        id="form-first_name"
        name="lastName"
        placeholder="Nom"
        autocomplete="off"
      />
      <label for="firstName">Prénom :</label>
      <input
        type="text"
        class="form-control"
        id="form-last_name"
        name="firstName"
        placeholder="Prénom"
        autocomplete="off"
      />
      <label for="age">Age : *</label>
      <input
        type="text"
        class="form-control required"
        id="form-age"
        name="age"
        placeholder="Age"
        autocomplete="off"
        @keyup="verifyAge"
      />
      <div id="form-age-error"></div>
      <div class="btns">
        <span class="btn btn-primary" @click="previousView">Previous</span>
        <span class="btn btn-primary" @click="nextView">Next</span>
      </div>
    </div>
    <!-------------------------------------------------------------------------->
    <div class="tab none">
      <legend>Your contact details :</legend>
      <label for="lastName">Email :</label>
      <input
        type="text"
        class="form-control"
        id="form-email"
        name="lastName"
        placeholder="user@domain.com"
        autocomplete="off"
        @keyup="verifyEmail"
      />
      <div id="form-email-error"></div>
      <label for="firstName">Phone number :</label>
      <input
        type="text"
        class="form-control"
        id="form-phone_number"
        name="firstName"
        placeholder="+33 0 00 00 00 00"
        autocomplete="off"
      />
      <div id="form-age-error"></div>
      <div class="btns">
        <span class="btn btn-primary" @click="previousView">Previous</span>
        <span class="btn btn-success" @click="post">Send</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./register";
</style>

<script src="./register"></script>