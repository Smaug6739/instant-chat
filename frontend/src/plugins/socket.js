import io from "socket.io-client";
import * as config from "../../config"
const socket = io(config.WEBSOCKET, {
	// withCredentials: true,
	transports: ['websocket']
});

export default {
	install: (app) => {
		// app.$socket = socket
		app.config.globalProperties.$socket = socket
	}
}