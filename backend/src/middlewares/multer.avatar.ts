import { join } from 'path'
import { IObject } from '../types';
import * as multer from 'multer'


let name;
let extension;
let fullName;
const tailleMax = 5 * 1024 * 1024; // 5MB
const MIME_TYPES: IObject = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
};
const MIME_TYPES_IMAGE: IObject = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
};

const storage = multer.diskStorage({
	destination: (req: IObject, file: IObject, callback: Function) => {
		if (MIME_TYPES_IMAGE[file.mimetype]) callback(null, `${join(__dirname, `../../public/uploads/avatars`)}`);
		else callback(null, `${join(__dirname, `../../public/uploads`)}`);
	},
	filename: (req: IObject, file: IObject, callback: Function) => {
		name = file.originalname.split(' ').join('_').replace('.', '_');
		extension = MIME_TYPES[file.mimetype];
		fullName = name + Date.now() + '.' + extension;
		if (!extension) callback(new Error("Only images allowed"))
		callback(null, fullName);
	}
});

module.exports = multer({
	storage: storage,
	limits: {
		fileSize: tailleMax,
	},
	fileFilter: (req: IObject, file: IObject, cb: Function) => {
		if (MIME_TYPES[file.mimetype]) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
}).single('avatar')