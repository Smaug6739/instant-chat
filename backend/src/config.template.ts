import { Iconfig } from './types';
export const config: Iconfig = {
	port: 3000,
	production: false,
	domain: "localhost",
	database: {
		host: 'localhost',
		user: 'root',
		password: '<db password>',
		database: 'instant-chat'
	},
	secret: "Random values",
	permissions: [
		{ value: 16, permission: 'BAN_MEMBERS' },
		{ value: 8, permission: 'DELETE_MEMBERS' },
		{ value: 4, permission: 'UPDATE_MEMBERS' },
		{ value: 2, permission: 'VIEW_MEMBERS' },
		{ value: 1, permission: 'ADMINISTRATOR' },
	],
	colors: [
		'brown', //Brown
		'red', //Red
		'#fcce14', //Orange
		'#56437a',//Purple
		'#0731ba'//Blue
	]
}
