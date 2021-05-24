<template>
  <!--<div id="nav-app">
     <div class="items-container">
      <div @click="openNav">
        <div class="btn-burger"><BtnBurger /></div>
      </div>
      <ul class="none" id="nav-channels">
        <div v-if="chats && chats !== 'none'">
          <li v-for="chat of chats" :key="chat">
            <div class="container-circle">
              <span class="circle">
                <span>
                  {{ chat.name.slice(0, 1) }}
                </span>
              </span>
            </div>
            <h6>
              <router-link :to="'/chats/' + chat.id">
                {{ chat.name }}
              </router-link>
            </h6>
          </li>
        </div>
        <div v-else>
          <span
            >Oh oh... on dirrait que vous n'avez accès a aucun channel ou qu'il
            n'en existe pas</span
          >
        </div>
      </ul>
    </div>
    <div id="user-container" class="none" v-if="user">
      <img v-if="user.avatar" :src="hostAvatar + user.avatar" />
      <span v-else class="circle" :style="'background-color:' + user.color">{{
        user.username.slice(0, 1)
      }}</span>
      <span> {{ user.username }} </span>
    </div>
  </div> -->
  <nav>
    <div class="items-container">
      <div @click="openNav">
        <div class="btn-burger"><BtnBurger /></div>
      </div>
      <div class="none-mobile" id="nav-channels">
        <div class="c-name">
          <svg
            class="cat-opened"
            id="cat-arrow-rooms"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
            ></path>
          </svg>
          <h5 id="rooms" @click="openCollapsible('rooms')" class="active">
            Rooms
          </h5>
        </div>
        <div class="content" id="content-rooms" style="max-height: 100%">
          <ul>
            <div v-if="chats && chats !== 'none'">
              <li v-for="chat of chats" :key="chat">
                <div class="container-circle">
                  <span class="circle">
                    <span>
                      {{ chat.name.slice(0, 1) }}
                    </span>
                  </span>
                </div>
                <h6>
                  <router-link :to="'/chats/' + chat.id">
                    {{ chat.name }}
                  </router-link>
                </h6>
              </li>
            </div>
            <div v-else>
              <span>Vous n'avez accès a aucun channel.</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div id="user-container" class="none-mobile" v-if="user">
      <img v-if="user.avatar" :src="hostAvatar + user.avatar" />
      <span v-else class="circle" :style="'background-color:' + user.color">{{
        user.username.slice(0, 1)
      }}</span>
      <span> {{ user.username }} </span>
    </div>
  </nav>
</template>

<script src="./nav.component.js"></script>

<style scoped lang="scss">
@import "./nav.component.scss";
</style>