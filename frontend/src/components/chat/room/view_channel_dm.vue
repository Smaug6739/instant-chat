<template>
  <div
    class="view-channel"
    id="view-channel"
    v-if="channel.id"
    @scroll="loadMessages"
  >
    <div v-if="messages.length">
      <ul class="imessage">
        <li v-for="message of messages" :key="message">
          <div class="msg">
            <div
              v-bind:class="
                me == message.author
                  ? 'from-me msg-content'
                  : 'from-them msg-content'
              "
            >
              <span class="content">{{ message.content }}</span>
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
</template>
<script src="./room"></script>

<style scoped lang="scss">
@import "../../../../public/scss/theme-variables";
.view-channel {
  height: 80vh;
  width: 100%;
  overflow-y: scroll;
}
ul {
  li {
    list-style: none;
  }
}
.imessage {
  background-color: $background-element-dark;
  //border: 1px solid #e5e5ea;
  border-radius: 0.25rem;

  font-family: "SanFrancisco";
  font-size: 1.25rem;
  margin: 0 auto 1rem;
  width: 100%;
  padding: 0.5rem 1.5rem;
  .msg {
    display: flex;
    flex-direction: column;
  }

  .msg-content {
    display: flex;
    border-radius: 1.15rem;
    line-height: 1.25;
    max-width: 75%;
    padding: 0.5rem 0.875rem;
    position: relative;
    word-wrap: break-word;
    &::before,
    &::after {
      bottom: -0.1rem;
      content: "";
      height: 1rem;
      position: absolute;
    }
  }
  .from-me {
    align-self: flex-end;
    background-color: #248bf5;
    color: #fff;
    &::before {
      border-bottom-left-radius: 0.8rem 0.7rem;
      border-right: 1rem solid #248bf5;
      right: -0.35rem;
      transform: translate(0, -0.1rem);
    }
    &::after {
      background-color: $background-element-dark;
      border-bottom-left-radius: 0.5rem;
      right: -40px;
      transform: translate(-30px, -2px);
      width: 10px;
    }
  }
  [class^="from-"] {
    margin: 0.5rem 0;
    width: fit-content;
  }
  .from-me ~ li.from-me {
    margin: 0.25rem 0 0;
  }
  .from-me ~ &.from-me:not(:last-child) {
    margin: 0.25rem 0 0;
  }
  .from-me ~ &.from-me:last-child {
    margin-bottom: 0.5rem;
  }
  .from-them {
    align-items: flex-start;
    background-color: #e5e5ea;
    color: #000;
    &:before {
      border-bottom-right-radius: 0.8rem 0.7rem;
      border-left: 1rem solid #e5e5ea;
      left: -0.35rem;
      transform: translate(0, -0.1rem);
    }
    &::after {
      background-color: $background-element-dark;
      border-bottom-right-radius: 0.5rem;
      left: 20px;
      transform: translate(-30px, -2px);
      width: 10px;
    }
  }
  [class^="from-"].emoji {
    background: none;
    font-size: 2.5rem;
  }
  [class^="from-"].emoji::before {
    content: none;
  }
  .no-tail::before {
    display: none;
  }
  .margin-b_none {
    margin-bottom: 0 !important;
  }
  .margin-b_one {
    margin-bottom: 1rem !important;
  }

  .margin-t_one {
    margin-top: 1rem !important;
  }
}

/* general styling */
@font-face {
  font-family: "SanFrancisco";
  src: url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff2")
      format("woff2"),
    url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff")
      format("woff");
}

@media screen and (max-width: 800px) {
  .imessage {
    font-size: 1.05rem;
    margin: 0 auto 1rem;
    max-width: 600px;
    padding: 0.25rem 0.875rem;
  }

  // .imessage li {
  //   margin: 0.5rem 0;
  // }
}
</style>
