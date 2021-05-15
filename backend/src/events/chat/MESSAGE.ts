import { auth } from '../auth'
export async function run(server: any, socket: any) {

	const user = auth(server, socket)
	console.log(user)

}

const infos = {
	event: 'MESSAGE'
}

export { infos }