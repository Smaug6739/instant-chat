<template>
  <div id="nav-app">
    <div class="channels-container">
      <div @click="openNav">
        <div class="btn-burger"><BtnBurger /></div>
      </div>
      <ul class="none" id="nav-channels">
        <div v-if="chats && chats !== 'none'">
          <li v-for="chat of chats" :key="chat">
            <div class="container-circle">
              <span class="circle">
                <span>
                  {{ chat.name.slice(0, 1) }}
                </span>
              </span>
            </div>
            <h6>
              <router-link :to="'/chats/' + chat.id">
                {{ chat.name }}
              </router-link>
            </h6>
          </li>
        </div>
        <div v-else>
          <span
            >Oh oh... on dirrait que vous n'avez accès a aucun channel ou qu'il
            n'en existe pas</span
          >
        </div>
      </ul>
    </div>
    <div id="user-container" class="none" v-if="user">
      <img v-if="user.avatar" :src="hostAvatar + user.avatar" />
      <span v-else class="circle">{{ user.username.slice(0, 1) }}</span>
      <span> {{ user.username }} </span>
    </div>
  </div>
</template>

<script>
import BtnBurger from "@/components/common/btn-burger.component.vue";

export default {
  name: "Chats list",
  data() {
    return {
      chats: null,
      user: null,
    };
  },
  components: {
    BtnBurger,
  },
  async beforeMount() {
    try {
      const responce = await fetch(
        `${this.$store.state.host}api/v1/chat/rooms`
      );
      if (!responce) this.chats = "none";
      else {
        const result = await responce.json();
        if (result && result.result.length) this.chats = result.result;
      }
    } catch {
      this.chats = "none";
    }
    this.user = this.$getUser();
  },
  methods: {
    openNav() {
      document.getElementById("nav-channels").classList.add("none");
      const btn = document.getElementById("btn-burger");
      if (btn.classList.contains("is-opened")) {
        btn.classList.add("is-closed");
        btn.classList.remove("is-opened");
        document.getElementById("user-container").classList.add("none");
      } else {
        document.getElementById("nav-channels").classList.remove("none");
        btn.classList.remove("is-closed");
        btn.classList.add("is-opened");
        document.getElementById("user-container").classList.remove("none");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../../public/scss/theme-variables";
@import "../../../../public/scss/mixins";
#nav-app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.channels-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
li {
  list-style: none;
  margin-left: -2rem;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  min-width: 160px;
  .circle {
    @include circle();
  }
}
.btn-burger {
  margin: 15px;
}
#user-container {
  height: 50px;
  background-color: $color-end;
  display: flex;
  span {
    margin-top: auto;
    margin-bottom: auto;
  }
}
.circle {
  @include circle(red, 1);
}
@media screen and (max-width: 900px) {
  .none {
    display: none !important;
  }
  .btn-burger {
    margin: 5px;
  }
}
@media screen and (min-width: 900px) {
  .btn-burger {
    display: none;
  }
}
</style>