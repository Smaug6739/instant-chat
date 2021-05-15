import { Socket } from 'socket.io'
import { App } from '../app';
export function auth(server: App, socket: Socket) {
	return new Promise(async (resolve, reject) => {
		const connectUser = server.sessionsMap.get(socket.id);
		if (connectUser) {
			resolve(true)
			server.debug('[USER AUTHENTICATED]', '\x1b[42m', `Socket id : ${socket.id}`);
		}
		else {
			server.debug('[CONNECTION_REQUIRE]', '\x1B[48;2;255;173;0m', `Emitted to : ${socket.id}`);
			server.io!.to(socket.id).emit('CONNECTION_REQUIRE')
			socket.on('CONNECTION_USER', (data) => {
				if (!data) return console.error('Missing data in CONNECTION_USER')
				if (!data.authentification.user_id) return console.error('Missing userid in CONNECTION_USER')
				if (!data.authentification.user_token) return console.error('Missing password in CONNECTION_USER')
				server.sessionsMap.set(socket.id, {
					user_id: data.authentification.user_id,
					user_token: data.authentification.user_token
				})
				resolve(true)
				server.debug('[USER CONNECTED]', '\x1b[42m', `Socket id : ${socket.id}`);
			})
			function eventCallback(data: any) {
				console.log('success')
			}
		}
	})
};