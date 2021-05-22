import { createStore } from 'vuex'

export default createStore({
  state: {
    host: "http://192.168.0.30:3000/",
    socket: "http://192.168.0.30:3000/socket.io",
    user: {
      id: null,
      username: null,
      email: null,
      avatar: null,
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
