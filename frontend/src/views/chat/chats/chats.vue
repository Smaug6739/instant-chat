<template>
  <div id="chats">
    <div class="chat">
      <div style="background: #212831" @click="openNav">
        <span class="btn-burger"><BtnBurger /></span>
      </div>
      <ul class="none" id="nav-channels">
        <div v-if="chats && chats !== 'none'">
          <li v-for="chat of chats" :key="chat">
            <div class="container-circle">
              <span class="circle">
                <span class="circle-letter">
                  {{ chat.name.slice(0, 1) }}
                </span>
              </span>
            </div>
            <h6>
              <router-link :to="'/chats/' + chat.id">{{
                chat.name
              }}</router-link>
            </h6>
          </li>
        </div>
        <div v-else>
          <span>Oh oh... on dirrait qu'il n'y a aucun chat ici</span>
        </div>
      </ul>

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