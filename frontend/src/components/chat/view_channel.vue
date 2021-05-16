<template>
  <div
    class="view-channel"
    id="view-channel"
    v-if="channel.id"
    @scroll="loadMessages"
  >
    <div v-if="messages.length">
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
      placeholder="Send a message"
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
      messages: [],
      isLoadgin: false,
      page: 1,
      noScroll: false,
      lastScroll: null,
    };
  },
  watch: {
    $route(to) {
      this.$emit("updateRoom", { id: to.params.room });
    },
    channel: function () {
      this.first = true;
      this.messages = [];
      this.page = 1;
      this.getMessages();
    },
  },
  methods: {
    sendMessage() {
      let data = document.getElementById("form-message").value;
      if (data) {
        this.$socket.emit("MESSAGE_CREATE", {
          channel: this.channel,
          message: data,
        });
        document.getElementById("form-message").value = "";
      }
    },
    scroll() {
      var div = document.getElementById("view-channel");
      div.scrollTop = div.scrollHeight;
    },
    loadMessages(e) {
      if (e.target.scrollTop === 0 && !this.isLoadgin) {
        this.page += 1;
        this.noScroll = true;
        this.lastScroll = document.getElementById("view-channel").scrollHeight;
        this.getMessages();
      }
    },
    async getMessages() {
      console.log("get");
      this.isLoadgin = true;
      const responce = await fetch(
        `${this.$store.state.host}api/v1/chat/messages/${this.channel.id}/${this.page}`,
        {
          credentials: "include",
          withCredentials: true,
        }
      );
      const result = await responce.json();
      if (result && result.status === "success") {
        let newArray = [];
        for (const msg of result.result) {
          newArray.push({ content: msg.content });
        }
        for (const msg of this.messages) {
          newArray.push(msg);
        }
        console.log(newArray.length);
        this.messages = newArray;
      }
      this.isLoadgin = false;
    },
  },
  beforeMount() {
    this.getMessages("first");
  },
  async updated() {
    if (!this.noScroll) {
      this.scroll();
    } else {
      const el = document.getElementById("view-channel");
      const newStroll = el.scrollHeight;
      const pos = newStroll - this.lastScroll;
      el.scrollTop = pos;
    }
  },
  mounted() {
    this.$socket.on("MESSAGE_CREATE", (data) => {
      if (data.channel === this.channel.id) {
        this.noScroll = false;
        this.messages.push({ content: data.message });
      }
    });
  },
};
</script>

<style scoped lang="scss">
.view-channel {
  height: 80vh;
  width: 100%;
  overflow-y: scroll;
}
</style>