<template>
  <div class="rooms-container">
    <Nav>
      <template v-slot:sub-nav> <RoomsList /></template>
    </Nav>
    <div class="views">
      <div v-if="type === 'room'" class="view">
        <ViewChannel />
      </div>
      <div v-else-if="type === 'settings'" class="view">
        <AccountSettings />
      </div>
      <div v-else>
        <h1 style="text-align: center; margin-top: 200px">
          Welcome to instant chat application
        </h1>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./chats.scss";
</style>
<script src='./chats.js'></script>