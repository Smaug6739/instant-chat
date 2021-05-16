<template>
  <div id="chats">
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
            <h6>
              <router-link :to="'/chats/' + chat.id">{{
                chat.name
              }}</router-link>
            </h6>
          </li>
        </ul>
      </div>
      <div class="chat">
        <div v-if="channel.id">
          <ViewChannel @updateRoom="updateRoom" :channel="channel" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./chats.scss";
</style>
<script src='./chats.js'></script>
