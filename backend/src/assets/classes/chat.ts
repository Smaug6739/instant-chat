import db from '../../models/db';
import { IObject, IUserInfos } from '../../types';
import { hasPermissions } from '../../utils/functions';

import { MemberClass } from './member';

const Member = new MemberClass();
export class ChatClass {

	public rooms = new Map()
	constructor() {
		db.query('SELECT * FROM channels', (err, result) => {
			if (err) throw err;
			for (const room of result) {
				this.rooms.set(room.id.toString(), room)
			}
		})
	}

	public getChats(): Promise<IObject> {
		return new Promise((resolve, reject) => {
			//if (!page) return reject(new Error('Missing page parameter'));
			//const pageNumber = parseInt(page);
			//if (isNaN(pageNumber)) return reject(new TypeError('Invalid page number'));
			//const skip = (pageNumber * 9) - 9;
			db.query('SELECT * FROM channels LIMIT 40', (err, result) => {
				if (err) return reject(err)
				resolve(result)
			})
		})
	}

	public getChat(chat: string): Promise<IObject> {
		return new Promise((resolve, reject) => {
			if (!chat) return reject(new Error('Missing chat parameter'));
			db.query('SELECT * FROM channels WHERE id = ? LIMIT 1', [chat], (err, result) => {
				if (err) return reject(err)
				resolve(result)
			})
		})
	}
	public postChat(
		cat_id: string,
		name: string,
		description: string,
		image: string,
	): Promise<IObject> {
		return new Promise((resolve, reject) => {
			if (!cat_id) return reject(new Error('Missing category id parameter'));
			if (!name) return reject(new Error('Missing name parameter'));
			if (!description) return reject(new Error('Missing description parameter'));
			if (!image) image = ''
			db.query('INSERT INTO channels (cat_id, name, description, image, created_timestamp) VALUES(?,?,?,?,?)', [cat_id, name, description, image, Date.now()], (err, result) => {
				if (err) return reject(err)
				resolve(result)
			})
		})
	}

	public getMessages(roomId: string, page: string): Promise<IObject> {
		return new Promise((resolve, reject) => {
			if (!roomId) return reject(new Error('Missing room id parameter'));
			if (!page) return reject(new Error('Missing page parameter'));
			if (!this.rooms.get(roomId)) return reject(new Error('Channel not found.'))
			const pageNumber = parseInt(page);
			if (isNaN(pageNumber)) return reject(new TypeError('Invalid page number'));
			const skip = (pageNumber * 25) - 25;
			db.query('SELECT * FROM messages LEFT JOIN members ON members.member_id = messages.author WHERE channel_id = ? ORDER BY messages.id DESC LIMIT 25 OFFSET ?', [roomId, skip], (err, result) => {
				if (err) return reject(err)
				resolve(result.reverse());
			})
		})
	}

	public postMessage(
		type: string,
		author: string,
		content: string,
		attachement: string,
		channel_id: string
	): Promise<IObject> {
		return new Promise(async (resolve, reject) => {
			if (!type) return reject(new Error('Missing type parameter'));
			if (!author) return reject(new Error('Missing author parameter'));
			if (!content) return reject(new Error('Missing content parameter'));
			if (!attachement) attachement = ''
			if (!channel_id) return reject(new Error('Missing channel id parameter'));
			const user = await Member.getUserPublic(author);
			if (!user) return reject('Member not found.')
			db.query('INSERT INTO messages (type, author, content, attachement, channel_id) VALUES(?,?,?,?,?);', [type, author, content, attachement, channel_id], (err, result) => {
				if (err) return reject(err)
				db.query('SELECT LAST_INSERT_ID();', (err, result) => {
					if (err) return reject(err);
					resolve({ message: { id: result[0]['LAST_INSERT_ID()'] }, user: user });
				})
			});
		});
	}
	public editMessage(
		user: IUserInfos,
		id: string,
		content?: string,
		attachement?: string,
	): Promise<IObject | Error | boolean> {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('Missing id parameter'));
			db.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(err);
				if (!result || !result.length) return reject(new Error('Message not found.'));
				const message = result[0];
				if (message.author !== user.id) {
					if (!hasPermissions(user.permissions, ['UPDATE_MESSAGE'])) return reject(new Error('[MISSING_PERMISSIONS] You need UPDATE_MESSAGE permissions.'))
				}
				if (!content) content = message.content;
				if (!attachement) attachement = message.attachement;
				db.query('UPDATE messages SET `content`=?, `attachement`=? WHERE id = ? LIMIT 1', [content, attachement, id], (err, result) => {
					if (err) return reject(err)
					resolve(true)
				})
			})
		})
	}

	public deleteMessage(
		user: IUserInfos,
		id: string,
	): Promise<IObject | Error | boolean> {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('Missing id parameter'));
			db.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(err);
				if (!result || !result.length) return reject(new Error('Message not found.'));
				const message = result[0];
				if (message.author !== user.id) {
					if (!hasPermissions(user.permissions, ['DELETE_MESSAGES'])) return reject(new Error('[MISSING_PERMISSIONS] You need DELETE_MESSAGES permissions.'))
				}
				db.query('DELETE FROM messages WHERE id = ? LIMIT 1', [id], (err, result) => {
					if (err) return reject(err)
					resolve(true)
				})
			})
		})
	}

}