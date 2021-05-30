<template>
  <nav>
    <ul>
      <li @click="changeView('v-1')">Account</li>
      <li @click="changeView('v-2')">Settings</li>
    </ul>
  </nav>
</template>
<script>
export default {
	methods:{
		changeView(newView) {
			this.closeAllViews();
			document.getElementById(newView).classList.remove("none");
		},
		closeAllViews() {
			document.getElementsByClassName("view").forEach((v) => {
				if (v.classList.contains("none")) return;
				v.classList.add("none");
			});
		}
	}
}
</script>
<style lang="scss" scoped>
@import "@/../public/scss/theme-variables";

ul,
li {
  list-style: none;
}
nav {
  min-width: 170px;
  width: 20%;
  ul {
    li {
      background: $background-element-light;
      border: 0.1px solid white;
      cursor: pointer;
      padding: 10px;
    }
  }
}
.none {
  display: none;
}
</style>