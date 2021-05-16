import { IObject } from '../../types'
import { ChatClass } from '../../assets/classes/chat';

const Chat = new ChatClass();
export async function run(server: any, socket: any, data: IObject, auth: IObject) {
	//const roster = server.io.sockets.adapter.rooms

	Chat.postMessage(
		`01`,
		auth.userId,
		data.message,
		'',
		data.channel.id
	)
		.then(() => {
			server.io.to(`01${data.channel.id}`).emit('MESSAGE_CREATE', {
				message: data.message,
				channel: data.channel.id
			})
		})
		.catch((err) => server.debug('[EVENT_ERROR]', '\x1b[41m', err))

}

const infos = {
	event: 'MESSAGE_CREATE',
	connection: true
}

export { infos }