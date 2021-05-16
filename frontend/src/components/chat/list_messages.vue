<template>
  <div v-if="messages">
    <ul>
      <li v-for="message of messages" :key="message">
        <p>{{ message.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "view_channel",
  props: {
    channel_id: [String, Number],
  },
  data() {
    return {
      messages: null,
    };
  },
  beforeMount() {
    this.getMessages(1);
  },

  methods: {
    async getMessages(page) {
      const responce = await fetch(
        `${this.$store.state.host}api/v1/chat/messages/${this.channel_id}/${page}`,
        {
          credentials: "include",
          withCredentials: true,
        }
      );
      const result = await responce.json();
      if (result && result.status === "success") this.messages = result.result;
    },
  },
};
</script>
