<template>
  <div id="user-container">
    <Nav />
    <main class="views-container">
      <div id="v-1" class="view" v-if="member">
        <div class="user-container">
          <img
            v-if="member.member_avatar"
            :src="hostAvatar + member.member_avatar"
            class="field"
          />
          <span
            v-else
            class="avatar field"
            :style="'background-color:' + member.member_color"
            >{{ member.member_nickname.slice(0, 1) }}</span
          >
          <h4 class="field field-username">
            Username : {{ member.member_nickname }}
          </h4>
        </div>
      </div>
      <div id="v-2" class="view none" v-if="member">
        <h4>User</h4>
        <div class="field">
          <label for="form-avatar">Avatar :</label>
          <input type="file" id="form-avatar" class="form-control" />
        </div>
        <h4>Account</h4>
        <div class="field">
          <label for="form-username">Username :</label>
          <input
            type="text"
            id="form-username"
            class="form-control"
            :value="member.member_nickname"
          />
        </div>
        <div class="field">
          <label for="form-first_name">First name :</label>
          <input
            type="text"
            id="form-first_name"
            class="form-control"
            :value="member.member_first_name"
          />
        </div>
        <div class="field">
          <label for="form-last_name">Last name :</label>
          <input
            type="text"
            id="form-last_name"
            class="form-control"
            :value="member.member_last_name"
          />
        </div>
        <h4>Contact</h4>
        <div class="field">
          <label for="form-email">Email :</label>
          <input
            type="text"
            id="form-email"
            class="form-control"
            :value="member.member_email"
          />
        </div>
        <div class="field">
          <label for="form-phone_number">Phone number :</label>
          <input
            type="text"
            id="form-phone_number"
            class="form-control"
            :value="member.member_phone_number"
          />
        </div>
        <hr />
        <span class="btn btn-primary btn-update" @click="updateAccount"
          >Update</span
        >
        <div v-if="alert.type && alert.msg">
          <Alert
            :type="alert.type"
            :message="alert.msg"
            @CLOSE_ALERT="closeAlert"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "./settings.component.scss";
</style>

<script src="./settings.component.js"></script>