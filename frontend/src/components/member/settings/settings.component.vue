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
        <ul class="member-infos">
          <li class="field user-infos">
            <span class="avatar">{{ member.member_nickname.slice(0, 1) }}</span>
          </li>
          <li class="field">
            <span class="field-title">Username : </span>
            <span class="field-value"> {{ member.member_nickname }} </span>
          </li>
        </ul>
      </div>
      <div id="v-2" class="view none">view two</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "./settings.component.scss";
</style>

<script src="./settings.component.js"></script>