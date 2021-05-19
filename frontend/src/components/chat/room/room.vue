<template>
  <div class="view-channel" id="view-channel" @scroll="loadMessages">
    <div v-if="existChannel">
      <div v-if="channel.id">
        <div v-if="messages.length">
          <ul class="imessage">
            <li v-for="message of messages" :key="message">
              <div
                v-bind:class="me == message.author ? 'from-me' : 'from-them'"
              >
                <div>
                  <img
                    v-if="message.member_avatar"
                    :src="hostAvatar + message.member_avatar"
                  />
                  <span
                    v-else
                    class="circle"
                    :style="'background-color:' + message.member_color"
                    >{{ message.member_nickname.slice(0, 1) }}</span
                  >
                  <div class="content">
                    <div>
                      <p>
                        <span class="by">by test :</span>
                        <br />
                        {{ message.content }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <input
          type="text"
          class="form-control input-message"
          @keyup.enter="sendMessage"
          id="form-message"
          placeholder="Send a message"
        />
      </div>
    </div>
    <div v-else-if="isLoadMessages">Je charge les messages...</div>
    <div v-else>Ce channel ne semble pas exister</div>
  </div>
</template>
<script src="./room"></script>

<style scoped lang="scss">
@import "./room";
</style>
