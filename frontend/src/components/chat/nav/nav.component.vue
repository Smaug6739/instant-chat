<template>
  <nav>
    <div id="nav-app">
      <div @click="openNav">
        <div class="btn-burger"><BtnBurger /></div>
      </div>
      <ul>
        <li class="icon">
          <router-link to="/app/friends" class="link">
            <FriendsIcon />
          </router-link>
        </li>
        <li class="icon">
          <router-link to="/app/room" class="link"><ChatsIcon /></router-link>
        </li>
        <li class="icon">
          <router-link to="/app/settings" class="link">
            <SettingsIcon />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="none" id="nav-no-mobile">
      <slot name="sub-nav"></slot>
    </div>
  </nav>
</template>


<script src="./nav.component.js"></script>

<style scoped lang="scss">
@import "./nav.component.scss";
</style>

