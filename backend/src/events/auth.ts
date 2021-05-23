import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken'
import { App } from '../app';
export function auth(server: App, socket: Socket) {

	try {
		const cookies: any = socket.handshake.headers.cookie;
		if (!cookies) throw 'Missing cookies'
		const cookiesParse = cookies.split(';').reduce((obj: Array<string>, c: string) => {
			let n: any = c.trim().split("=")
			obj[n[0]] = n[1].trim();
			return obj;
		}, {})
		if (!cookiesParse) throw 'Missing cookies';
		if (!cookiesParse.user_token) throw 'Missing token cookie.';
		if (!cookiesParse.user_id) throw 'Missing token cookie.';
		const decoded: any = verify(cookiesParse.user_token, server.config.secret);
		if (cookiesParse.user_id != decoded.userId) throw 'Bad user';

		let userPermissions = [];
		for (let permission of server.config.permissions) {
			const rest = decoded.userPermissions % permission.value;
			if (rest == 0 && decoded.userPermissions != 0) {
				userPermissions.push(permission);
				break;
			}
			if (rest < decoded.userPermissions) {
				userPermissions.push(permission.permission);
				decoded.userPermissions = rest
			}
		}
		return {
			status: 'success',
			id: decoded.userId,
			permissions: userPermissions
		}

	} catch (err) {
		server.debug('[AUTENTIFICATION_ERROR]', '\x1b[41m', err)
		socket.emit('CONNECTION_ERROR', err)
		return {
			status: 'error',
			error: err
		};
	}
};