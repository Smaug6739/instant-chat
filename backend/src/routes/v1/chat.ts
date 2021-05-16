import { Router } from 'express';
import * as ChatCtrl from '../../controllers/chat.controller';
import { Iroute } from '../../types';
import auth from '../../middlewares/auth';
const ChatRouter: Router = Router();

//ChatRouter.post('/', ChatCtrl.createMember);
ChatRouter.get('/rooms', ChatCtrl.getChats);
ChatRouter.get('/chat/:chat', ChatCtrl.getChat);

ChatRouter.post('/message', auth, ChatCtrl.postMessage)
ChatRouter.patch('/message/:messageId', auth, ChatCtrl.editMessage)
ChatRouter.delete('/message/:messageId', auth, ChatCtrl.deleteMessage)


export const infos: Iroute = {
	route: "chat",
	version: 1,
	router: ChatRouter
};