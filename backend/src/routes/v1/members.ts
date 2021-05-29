import { Router } from 'express';
import * as MemberCtrl from '../../controllers/members';
import { Iroute } from '../../types';
import auth from '../../middlewares/auth';
const MulterAvatar = require('../../middlewares/multer.avatar')
const MemberRouter: Router = Router();

MemberRouter.post('/', MulterAvatar, MemberCtrl.createMember);
MemberRouter.post('/auth', MemberCtrl.auth);
MemberRouter.get('/disconnection', MemberCtrl.disconnect);

MemberRouter.get('/all/:page', auth, MemberCtrl.getMembers);
MemberRouter.get('/:userId', auth, MemberCtrl.getMember);

MemberRouter.put('/:userId', MulterAvatar, auth, MemberCtrl.updateMember);

MemberRouter.delete('/:userId', auth, MemberCtrl.deleteMember)

export const infos: Iroute = {
    route: "members",
    version: 1,
    router: MemberRouter
};