<template>
  <div id="nav-container">
    <nav>
      <div class="items-container">
        <div>
          <h6>Instant chat</h6>
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
                    <router-link :to="'/app/room/' + chat.id">
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
      <div id="user-container" v-if="user">
        <img
          v-if="user.avatar"
          :src="hostAvatar + user.avatar"
          class="user-avatar"
        />
        <span v-else class="circle" :style="'background-color:' + user.color">{{
          user.username.slice(0, 1)
        }}</span>
        <span> {{ user.username }} </span>
      </div>
    </nav>
  </div>
</template>

<script src="./nav_rooms.component.js"></script>

<style scoped lang="scss">
@import "./nav_rooms.component.scss";
</style>