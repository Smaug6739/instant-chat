<template>
  <div id="chats">
    <p>Chats</p>
    <Loader msg="Loading..." v-if="!chats" />
  </div>
</template>

<script>
import Loader from "@/components/common/loader.component.vue";
export default {
  name: "Chats",
  components: {
    Loader,
  },
};
</script>
