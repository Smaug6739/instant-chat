import { IObject, IUserInfos } from '../../types'
import { ChatClass } from '../../assets/classes/chat';
const Chat = new ChatClass();
export async function run(server: any, socket: any, data: IObject, auth: IUserInfos, callback: Function) {

	Chat.deleteMessage(
		auth, data.message_id
	)
		.then(() => {
			server.io.to(`01${data.channel_id}`).emit('MESSAGE_DELETE', {
				message_id: data.message_id,
				channel_id: data.channel_id
			})
			callback({
				status: 'success'
			})
		})
		.catch((err) => {
			server.debug('[EVENT_ERROR]', '\x1b[41m', err.stack)
			callback({
				status: 'error',
				error: err
			})
		})

}

const infos = {
	event: 'MESSAGE_DELETE',
	connection: true
}

export { infos }