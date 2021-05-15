<template>
  <footer>
    <div class="contenu-footer">
      <div class="footer-bloc footer-services">
        <h3 class="footer-subtitle">Menu</h3>
        <ul class="liste-services">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/vps">VPS</router-link></li>
          <li><router-link to="/web">Web</router-link></li>
          <li><router-link to="/hosting">Hosting</router-link></li>
        </ul>
      </div>
      <div class="footer-bloc footer-contact">
        <h3 class="footer-subtitle">Contact</h3>
        <ul class="liste-contact">
          <li><a href="mailto:raphael.veauville@gmail.com">Mail</a></li>
          <li>Tel : +33 00 00 00 00</li>
        </ul>
      </div>
      <div class="footer-bloc footer-services">
        <ul class="liste-services">
          <h3 class="footer-subtitle">Connexion</h3>

          <li><router-link to="/member/login">Connexion</router-link></li>
          <li><router-link to="/member/register">Inscription</router-link></li>
        </ul>
      </div>
      <div class="footer-bloc footer-medias">
        <h3 class="footer-subtitle">Reseaux</h3>
        <ul class="liste-medias">
          <li>
            <a href="#" target="__blank">Facebook</a>
          </li>
          <li>
            <a href="#" target="__blank">Discord</a>
          </li>
          <li>
            <a href="#" target="__blank">Instagram</a>
          </li>
          <li>
            <a href="#" target="__blank">Twitter</a>
          </li>
          <li>
            <a href="#" target="__blank">Youtube</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "../../../public/scss/theme-variables";
footer {
  flex-shrink: 0;
  border-top: 1px dashed #000;
  width: 100%;
  background: $layout-color;
  font-weight: 600;
}
.contenu-footer {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  padding: 50px 0 100px;
}
.copy {
  text-align: center;
  margin-bottom: 10px;
}
.footer-bloc {
  width: 25%;
  margin: 0 30px;
}
.footer-services h3,
.footer-contact h3,
.liste-connexion h3,
.footer-medias h3 {
  font-size: 25px;
  padding-bottom: 20px;
}
.liste-services,
.liste-contact,
.liste-connexion,
.liste-medias {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.liste-services a {
  text-decoration: none;
  color: whitesmoke;
}
.liste-contact a {
  text-decoration: none;
  color: whitesmoke;
}
.liste-connexion a {
  text-decoration: none;
  color: whitesmoke;
}
.liste-medias a {
  text-decoration: none;
  color: whitesmoke;
}
.liste-services a:hover {
  color: rgb(3, 3, 3);
}
.liste-contact a:hover {
  color: rgb(3, 3, 3);
}
.liste-connexion a:hover {
  color: rgb(3, 3, 3);
}
.liste-medias a:hover {
  color: rgb(3, 3, 3);
}
#footer-img {
  width: 20px;
}
.footer-subtitle {
  font-weight: 600;
  color: var(--white);
}
@media screen and (max-width: 1200px) {
  .contenu-footer {
    width: 600px;
    flex-wrap: wrap;
  }
  .footer-bloc {
    width: 40%;
    margin: 0 0;
  }
  .liste-services,
  .liste-contact {
    margin-bottom: 50px;
  }
}
@media screen and (max-width: 700px) {
  .contenu-footer {
    width: 320px;
    margin-left: 0;
  }
  .footer-bloc {
    width: 300px;
    margin: 30px 30px;
  }
  .liste-services,
  .liste-contact {
    margin-bottom: 30px;
  }
  .footer-services {
    margin-top: 0px;
  }
}
</style>