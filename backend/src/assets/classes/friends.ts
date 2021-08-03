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
			db.query('SELECT * FROM channels LIMIT 40', (err, result) => {
				if (err) return reject(err)
				resolve(result)
			})
		})
	}
}

