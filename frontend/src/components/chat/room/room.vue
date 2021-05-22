<template>
  <div class="view-channel" id="view-channel" @scroll="loadMessages">
    <div v-if="existChannel" class="max-container">
      <div class="msgs-in">
        <div v-if="messages.length">
          <ul class="imessage">
            <li v-for="(message, index) of messages" :key="message">
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
                    <div v-if="me == message.author" class="order-min">
                      <DotsM :id="index">
                        <template v-slot:menu>
                          <li
                            class="li-dots-menu"
                            @click="editMessage(index, message.content)"
                          >
                            Editer
                          </li>
                          <li class="li-dots-menu">Supprimer</li>
                        </template>
                      </DotsM>
                    </div>
                    <div :id="'msg-' + index">
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
        <div>
          <div id="err-send-msg" class="error_msg"></div>
          <input
            type="text"
            class="form-control input-message"
            @keyup.enter="sendMessage"
            id="form-message"
            placeholder="Send a message"
          />
        </div>
      </div>
    </div>
    <div v-else-if="isLoadMessages">Je charge les messages...</div>
    <div v-else>Ce channel ne semble pas exister</div>
  </div>
</template>
<script src="./room"></script>

<style lang="scss">
@import "./room";
</style>
