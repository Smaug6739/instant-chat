<template>
  <div class="view-channel" id="view-channel" @scroll="loadMessages">
    <div v-if="found">
      <div v-if="channel.id">
        <div v-if="messages.length">
          <ul class="imessage">
            <li v-for="message of messages" :key="message">
              <div
                v-bind:class="me == message.author ? 'from-me' : 'from-them'"
              >
                <div>
                  <div class="author">{{ message.author }}</div>
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
          class="form-control"
          @keyup.enter="sendMessage"
          id="form-message"
          placeholder="Send a message"
        />
      </div>
    </div>
    <div v-else>Aucun chat trouvé ici...</div>
  </div>
</template>
<script src="./room"></script>

<style scoped lang="scss">
@import "./room";
</style>
