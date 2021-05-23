import { IObject } from '../../types'
import { ChatClass } from '../../assets/classes/chat';
//const roster = server.io.sockets.adapter.rooms
const Chat = new ChatClass();
export async function run(server: any, socket: any, data: IObject, auth: IObject, callback: Function) {

	Chat.postMessage(
		`01`,
		auth.id,
		data.message,
		'',
		data.channel.id
	)
		.then((result) => {
			server.io.to(`01${data.channel.id}`).emit('MESSAGE_CREATE', {
				message_id: result.message.id,
				channel: data.channel.id,
				author: auth.id,
				content: data.message,
				member_avatar: result.user.member_avatar,
				member_color: result.user.member_color,
				member_nickname: result.user.member_nickname
			})
			callback({
				status: 'success'
			})
		})
		.catch((err) => {
			callback({
				status: 'error',
				error: err
			})
			server.debug('[EVENT_ERROR]', '\x1b[41m', err.stack)
		})

}

const infos = {
	event: 'MESSAGE_CREATE',
	connection: true
}

export { infos }