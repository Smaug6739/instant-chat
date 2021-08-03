import { ChatClass } from '../assets/classes/chat';
import { IObject, IUserInfos } from '../types';
import { checkAndChange } from '../utils/functions';
const Chat = new ChatClass();




export function getChat(req: IObject, res: IObject): void {
	Chat.getChat(req.params.roomId)
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}
export function getChats(req: IObject, res: IObject): void {
	Chat.getChats()
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}

export function getMessages(req: IObject, res: IObject): void {
	Chat.getMessages(req.params.roomId, req.params.page)
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}

export function postMessage(req: IObject, res: IObject): void {
	Chat.postMessage(
		req.body.type,
		req.body.author,
		req.body.content,
		req.body.attachement,
		req.body.channel_id
	)
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}

export function editMessage(req: IObject, res: IObject): void {
	const userInfos: IUserInfos = {
		id: req.user.id,
		permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
	}
	Chat.editMessage(
		userInfos,
		req.params.messageId,
		req.body.content,
		req.body.attachement,
	)
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}

export function deleteMessage(req: IObject, res: IObject): void {
	const userInfos: IUserInfos = {
		id: req.user.id,
		permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
	}
	Chat.deleteMessage(
		userInfos,
		req.params.messageId,
	)
		.then(result => res.status(200).json(checkAndChange(result)))
		.catch(error => res.json(checkAndChange(error)))
}

