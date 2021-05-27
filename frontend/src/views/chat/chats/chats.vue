<template>
  <div class="rooms-container">
    <Nav>
      <template v-slot:sub-nav> <RoomsList /></template>
    </Nav>
    <div v-if="type === 'room'" class="room">
      <ViewChannel />
    </div>
    <div v-else-if="type === 'settings'" class="room">
      <AccountSettings />
    </div>

    <div></div>
  </div>
</template>


<style scoped lang="scss">
@import "./chats.scss";
</style>
<script src='./chats.js'></script>