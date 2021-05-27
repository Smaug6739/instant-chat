import io from "socket.io-client";
const socket = io("ws://192.168.0.31:3000", {
	// withCredentials: true,
	transports: ['websocket']
});

export default {
	install: (app) => {
		// app.$socket = socket
		app.config.globalProperties.$socket = socket
	}
}