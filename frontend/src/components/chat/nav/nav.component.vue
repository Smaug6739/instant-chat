<template>
  <nav>
    <div id="nav-app">
      <div @click="openNav">
        <div class="btn-burger"><BtnBurger /></div>
      </div>
      <ul>
        <li class="icon">
          <FriendsIcon />
        </li>
        <li class="icon">
          <router-link to="/room"><ChatsIcon /></router-link>
        </li>
        <li class="icon">
          <SettingsIcon />
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

