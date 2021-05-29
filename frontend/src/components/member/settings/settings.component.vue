<template>
  <div id="user-container">
    <nav>
      <ul>
        <li @click="changeView('v-1')">Account</li>
        <li @click="changeView('v-2')">Settings</li>
      </ul>
    </nav>
    <main class="views-container">
      <div id="v-1" class="view" v-if="member">
        <div class="user-container">
          <span class="avatar field">{{
            member.member_nickname.slice(0, 1)
          }}</span>
          <h4 class="field field-username">
            Username : {{ member.member_nickname }}
          </h4>
        </div>
      </div>
      <div id="v-2" class="view none">view two</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "./settings.component.scss";
</style>

<script src="./settings.component.js"></script>