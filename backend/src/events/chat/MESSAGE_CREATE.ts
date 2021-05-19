import { IObject } from '../../types'
import { ChatClass } from '../../assets/classes/chat';
//const roster = server.io.sockets.adapter.rooms
const Chat = new ChatClass();
export async function run(server: any, socket: any, data: IObject, auth: IObject) {

	Chat.postMessage(
		`01`,
		auth.userId,
		data.message,
		'',
		data.channel.id
	)
		.then((user) => {
			server.io.to(`01${data.channel.id}`).emit('MESSAGE_CREATE', {
				channel: data.channel.id,
				author: auth.userId,
				content: data.message,
				member_avatar: user.member_avatar,
				member_color: user.member_color,
				member_nickname: user.member_nickname
			})
		})
		.catch((err) => server.debug('[EVENT_ERROR]', '\x1b[41m', err))

}

const infos = {
	event: 'MESSAGE_CREATE',
	connection: true
}

export { infos }