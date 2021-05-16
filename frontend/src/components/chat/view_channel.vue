<template>
  <div class="view-channel">
    {{ channel.id }}
    <div v-if="messages">
      <ul>
        <li v-for="message of messages" :key="message">
          <p>{{ message.content }}</p>
        </li>
      </ul>
    </div>
    <input
      type="text"
      class="form-control"
      @keyup.enter="sendMessage"
      id="form-message"
    />
  </div>
</template>
<script>
export default {
  name: "view_channel",
  props: {
    channel: [Object],
  },
  data() {
    return {
      messages: null,
    };
  },
  methods: {
    sendMessage() {
      const data = document.getElementById("form-message").value;
      if (data) {
        this.$socket.emit("MESSAGE_CREATE", {
          channel: this.channel,
          message: data,
        });
        console.log("sent");
      }
    },
  },
  watch: {
    channel: function (newVal) {
      this.$socket.emit("VIEW_CHANNEL", {
        type: newVal.type,
        id: newVal.id,
      });
    },
  },
  mounted() {
    this.$socket.emit("VIEW_CHANNEL", {
      type: this.channel.type,
      id: this.channel.id,
    });
  },
  unmounted() {
    this.$socket.emit("LEAVE_CHANNEL", {
      type: this.channel.type,
      id: this.channel.id,
    });
  },
};
</script>

<style scoped lang="scss">
</style>