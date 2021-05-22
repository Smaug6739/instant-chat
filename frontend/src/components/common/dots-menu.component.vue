<template>
  <div class="menu-container">
    <div class="dots" @click="showDropdown">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <ul class="none menu" :id="id">
      <slot name="menu" class="dots"></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dots-menu",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    e() {
      console.log("e");
    },
    showDropdown() {
      const menu = document.getElementById(this.id);
      if (menu.classList.contains("none")) menu.classList.remove("none");
      setTimeout(() => {
        document.addEventListener(
          "click",
          () => {
            if (!menu.classList.contains("none")) menu.classList.add("none");
          },
          { once: true }
        );
      }, 500);
    },
  },
};
</script>
<style lang="scss" scoped>
.dots {
  display: flex;
  flex-direction: column;
}
.dot {
  display: block;
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  margin: 3px;
}
.none {
  display: none !important;
}
.menu-container {
  position: relative;
}
.menu {
  position: absolute;
  display: block;
  width: 100px;
  top: 35px;
  background-color: white;
  border: 1px solid black;
  border-radius: 6px;
  padding: 5px;
  color: black;
}
</style>