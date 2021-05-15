<template>
  <div id="container">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
      integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
      crossorigin="anonymous"
    />
    <form id="select">
      <input type="radio" id="f-one" name="c" @click="view('id-one')" checked />
      <label for="f-one">Console</label>
      <input type="radio" id="f-two" name="c" @click="view('id-two')" />
      <label for="f-two">File manager</label>
      <input type="radio" id="f-three" name="c" @click="view('id-three')" />
      <label for="f-three">Database</label>
      <input type="radio" id="f-four" name="c" @click="view('id-four')" />
      <label for="f-four">Settings</label>
    </form>
    <div id="views">
      <div id="id-one">
        <div id="one-element">
          <h4>Blue</h4>
          <ul>
            <li>🔴 Offline</li>
            <li><i class="fas fa-server"></i> game-01.plus-heberg.tk</li>
            <li><i class="fas fa-microchip"></i> Processeur : 00.0%</li>
            <li><i class="fas fa-memory"></i> Ram : 560MO</li>
            <li><i class="fas fa-memory"></i> Stockage : 2GO</li>
          </ul>
          <span class="btn btn-success button" @click="testMessage">Start</span>
          <span class="btn btn-warning button">Restart</span>
          <span class="btn btn-danger button">Stop</span>
          <span class="btn btn-primary button">Whitelist</span>
          <div class="console">
            <p>Console...</p>
          </div>
        </div>
      </div>
      <div id="id-two">
        <h2>Téléchargez vos fichiers :</h2>
        <label for="#db-1">Vos fichiers :</label>
        <input class="form-control" type="file" id="db-1" />
        <div id="btns">
          <span class="btn2">Fichier <i class="fas fa-passport"></i></span>
          <span class="btn3">Plugin java <i class="fas fa-plug"></i></span>
          <span class="btn3">Plugin MCPE <i class="fas fa-plug"></i></span>
        </div>
        <!--<span class="btn2">Dossier <i class="fas fa-folder"></i></span>
        <span class="btn2">Upload <i class="fas fa-file-download"></i></span>-->
      </div>
      <div id="id-three">
        <form>
          <label for="#db-1">Base de donnée :</label>
          <input
            class="form-control"
            type="text"
            placeholder="Nom de la base de donnée"
            id="db-1"
          />
          <label for="#db-1">Utilisateur :</label>
          <input
            class="form-control"
            type="text"
            placeholder="Utilisateur"
            id="db-2"
          />
          <label for="#db-1">Mot de passe :</label>
          <input
            class="form-control"
            type="text"
            placeholder="Mot de passe"
            id="db-3"
          />
          <label for="#db-1">Port :</label>
          <input
            class="form-control"
            type="number"
            placeholder="3306"
            id="db-4"
          />
        </form>
      </div>
      <div id="id-four">Settings</div>
    </div>
    <router-link to="/member/settings" id="settings" class="btn btn-primary"
      >Paramètres de votre compte</router-link
    >
  </div>
</template>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
#container {
  width: 75%;
  margin-left: 12.5%;
  #select {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    input[type="radio"]:checked + label {
      margin-bottom: 5px;
      border-bottom: 4px rgb(84, 90, 167) solid;
      border-radius: 2px;
    }
  }
  #views {
    div {
      min-height: 50vh;
      background-color: $background-element;
      border-radius: 10px;
    }
    margin: 5px;
    padding: 5px;
    margin-bottom: 30px;
  }
}
#f-one,
#f-two,
#f-three,
#f-four {
  display: none;
}
#id-one,
#id-two,
#id-three,
#id-four {
  display: none;
}

#one-element {
  color: white;
  padding: 25px;
  h4 {
    background-color: #333;
    border-radius: 10px;
    padding: 5px;
  }
  li {
    padding-top: 3px;
    list-style: none;
  }
  .console {
    height: 20vh;
    background-color: #333 !important;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    padding: 5px;
  }
  .button {
    margin: 5px;
  }
}

#settings {
  float: right;
  margin: 5px;
}
#id-two {
  padding: 40px;
}
#id-three {
  padding: 30px;
}
.btn2 {
  padding: 8px;
  margin: 5px;
  margin-top: 15px;
  display: block;
  width: 90px;
  height: 40px;
  color: white;
  background-color: #29aa63;
}
.btn3 {
  padding: 8px;
  margin: 5px;
  margin-top: 15px;
  display: block;
  width: 120px;
  height: 40px;
  color: white;
  background-color: #29aa63;
}
#btns {
  display: flex;
}
</style>

<script>
export default {
  methods: {
    view(id) {
      document.getElementById("id-one").style = "display:none;";
      document.getElementById("id-two").style = "display:none;";
      document.getElementById("id-three").style = "display:none;";
      document.getElementById("id-four").style = "display:none;";
      document.getElementById(id).style = "display:block;";
    },
    testMessage() {
      this.$socket.emit("MESSAGE");
    },
  },
  mounted() {
    this.view("id-one");
  },
};
</script>
