<template>
  <div class="view-channel" id="view-channel">
    <div v-if="found">
      <div v-if="channel.id" @scroll="loadMessages">
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
@import "../../../../public/scss/theme-variables";
@import "../../../../public/scss/mixins";

.view-channel {
  height: 97vh;
  width: 100%;
  overflow-y: scroll;
}
.imessage {
  width: 100%;
  display: flex;
  flex-direction: column;
  ul,
  li {
    list-style-type: none;
  }

  li {
    margin-left: -2em;
    .from-me {
      div {
        display: flex;
        justify-content: flex-end;
        .content {
          background-color: #248bf5;
          max-width: 90%;
          padding: 5px 10px 0px 10px;
          border-radius: 0.7rem;
          margin-right: 10px;
          margin: 5px;
        }
        .author {
          order: 2;
          @include circle();
        }
      }
    }
    .from-them {
      div {
        display: flex;
        justify-content: flex-start;
        .content {
          background-color: #248bf5;
          max-width: 90%;
          padding: 5px 10px 0px 10px;
          border-radius: 1.2rem;
          margin-right: 10px;
          margin: 5px;
        }
        .author {
          order: -1;
          @include circle();
        }
      }
    }
  }
}
</style>
