<template>
  <div class="channels-container">
    <div @click="openNav">
      <div class="btn-burger"><BtnBurger /></div>
    </div>
    <ul class="none" id="nav-channels">
      <div v-if="chats && chats !== 'none'">
        <li v-for="chat of chats" :key="chat">
          <div class="container-circle">
            <span class="circle">
              <span class="circle-letter">
                {{ chat.name.slice(0, 1) }}
              </span>
            </span>
          </div>
          <h6>
            <router-link :to="'/chats/' + chat.id">{{ chat.name }}</router-link>
          </h6>
        </li>
      </div>
      <div v-else>
        <span>Oh oh... on dirrait qu'il</span>
      </div>
    </ul>
  </div>
</template>

<script>
import BtnBurger from "@/components/common/btn-burger.component.vue";

export default {
  name: "Chats list",
  data() {
    return {
      chats: null,
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
  },
  methods: {
    openNav() {
      document.getElementById("nav-channels").classList.add("none");
      const btn = document.getElementById("btn-burger");
      if (btn.classList.contains("is-opened")) {
        btn.classList.add("is-closed");
        btn.classList.remove("is-opened");
      } else {
        document.getElementById("nav-channels").classList.remove("none");
        btn.classList.remove("is-closed");
        btn.classList.add("is-opened");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../../public/scss/theme-variables";
@import "../../../../public/scss/mixins";

.channels-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
li {
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  min-width: 150px;
  .circle {
    @include circle();
  }
}
.btn-burger {
  margin: 15px;
}
@media screen and (max-width: 900px) {
  .none {
    display: none;
  }
}
@media screen and (min-width: 900px) {
  .btn-burger {
    display: none;
  }
}
</style>