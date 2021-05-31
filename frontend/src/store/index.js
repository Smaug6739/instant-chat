import { createStore } from 'vuex'
import * as config from "../../config"
export default createStore({
  state: {
    host: config.ROOT_API,
    hostAvatar: config.AVATAR_HOST,
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
