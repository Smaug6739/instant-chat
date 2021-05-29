import { unlink, stat } from 'fs/promises';
import { join } from 'path';


export default async function deleteOldAvatar(image: string,) {
	if (!image) return false;
	stat(join(__dirname, `../../public/uploads/avatars/webp/${image}`))
		.then(async (infos) => {
			if (infos) await unlink(join(__dirname, `../../public/uploads/avatars/webp/${image}`))
		})
	return true
}
