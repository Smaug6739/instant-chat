import { unlink } from 'fs/promises';
import { join } from 'path';

const sharp = require('sharp');


export default async function convertAvatar(image: string, size: number) {
	if (!image) return true
	sharp(join(__dirname, `../../public/uploads/avatars/${image}`))
		.resize(size, size)
		.toFile(join(__dirname, `../../public/uploads/avatars/webp/${image}.webp`), async (err: Error) => {
			if (err) return false
			await unlink(join(__dirname, `../../public/uploads/avatars/${image}`))
		})
	return true
}
