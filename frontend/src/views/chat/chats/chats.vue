<template>
  <div id="chats">
    <p>Chats</p>
    <Loader msg="Loading..." v-if="!chats" />
    <div v-if="chats" class="chat">
      <div class="list">
        <ul>
          <h5>Rooms :</h5>
          <li v-for="chat of chats" :key="chat">
            <div class="container-circle">
              <span class="circle"
                ><span class="circle-letter">{{
                  chat.name.slice(0, 1).toUpperCase()
                }}</span></span
              >
            </div>
            <h6 @click="viewRoom(chat.id, 'TEXT_ROOM')">{{ chat.name }}</h6>
          </li>
        </ul>
      </div>
      <div class="chat">
        <div v-if="channel.id && channel.type">
          <ViewChannel :channel="channel" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./chats.scss";
</style>
<script src='./chats.js'></script>
