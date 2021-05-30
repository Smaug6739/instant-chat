<template>
  <div class="view-channel" id="view-channel" @scroll="loadMessages">
    <div v-if="existChannel" class="max-container">
      <div class="msgs-in">
        <div v-if="messages.length">
          <ul class="imessage">
            <li v-for="message of messages" :key="message">
              <div
                v-bind:class="me == message.author ? 'from-me' : 'from-them'"
                :id="'msg-' + message.message_id"
              >
                <img
                  v-if="message.member_avatar"
                  :src="hostAvatar + message.member_avatar"
                  class="user-avatar order"
                />
                <span
                  v-else
                  class="circle"
                  :style="'background-color:' + message.member_color"
                  >{{ message.member_nickname.slice(0, 1) }}</span
                >
                <div class="content">
                  <div class="max-container">
                    <div class="none" :id="'edit-' + message.message_id">
                      <textarea
                        class="textarea"
                        v-text="message.content"
                        @keyup.enter="editMessage(message.message_id)"
                      ></textarea
                      ><span
                        class="prop-choice"
                        @click="deleteEdit(message.message_id)"
                        >Cancel</span
                      >
                      <span
                        class="prop-choice"
                        @click="editMessage(message.message_id)"
                        >Edit</span
                      >
                    </div>
                    <p :id="'msg' + message.message_id">
                      <span class="by">By {{ message.member_nickname }}</span>
                      <br />
                      {{ message.content }}
                    </p>
                  </div>
                  <div v-if="me == message.author" class="end">
                    <DotsM :id="message.message_id">
                      <template v-slot:menu>
                        <li
                          class="li-dots-menu"
                          @click="viewEdit(message.message_id)"
                        >
                          Edit
                        </li>
                        <li
                          class="li-dots-menu"
                          @click="deleteMessage(message.message_id)"
                        >
                          Delete
                        </li>
                      </template>
                    </DotsM>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div id="err-msg" class="error_msg"></div>
          <input
            type="text"
            class="form-control input-message"
            @keyup.enter="sendMessage"
            id="form-message"
            placeholder="Send a message"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
    <div v-else-if="isLoadMessages">Je charge les messages...</div>
    <div v-else>Ce channel ne semble pas exister</div>
  </div>
</template>
<script src="./room"></script>

<style lang="scss" scoped>
@import "./room";
</style>
