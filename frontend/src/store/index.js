import { createStore } from 'vuex'

export default createStore({
  state: {
    host: "http://192.168.0.30:3000/",
    socket: "http://192.168.0.30:3000/socket.io",
    hostAvatar: "http://192.168.0.30:3000/cdn/avatars/webp/",
    user: {
      id: null,
      username: null,
      email: null,
      avatar: null,
    },
    rooms: Array
  },
  mutations: {
    updateRooms(state, newParams) {
      state.rooms = newParams
    }
  },
  actions: {
  },
  modules: {
  }
})
