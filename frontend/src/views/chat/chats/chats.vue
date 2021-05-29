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
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "./chats.scss";
</style>
<script src='./chats.js'></script>