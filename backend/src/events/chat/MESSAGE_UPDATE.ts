import { IObject, IUserInfos } from '../../types'
import { ChatClass } from '../../assets/classes/chat';
const Chat = new ChatClass();
export async function run(server: any, socket: any, data: IObject, auth: IUserInfos, callback: Function) {

	Chat.editMessage(auth, data.message_id, data.message_content)
		.then(() => {
			server.io.to(`01${data.channel.id}`).emit('MESSAGE_UPDATE', {
				message_id: data.message_id,
				message_content: data.message_content
			})
		})
		.catch((e) => {
			console.log(e)
		})


}

const infos = {
	event: 'MESSAGE_UPDATE',
	connection: true
}

export { infos }