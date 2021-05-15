import { auth } from '../auth'
export function run(server: any, socket: any) {
	// server.sessionsMap.set(socket.id, {
	// 	user_id: socket.authentification.user_id,
	// 	user_token: socket.authentification.user_token
	// })
	const user = auth(server, socket)
	console.log(user)
}

const infos = {
	event: 'GET_USER'
}

export { infos }