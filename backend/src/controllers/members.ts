import { MemberClass } from '../assets/classes/member';
import { IObject, IMember, IUserInfos } from '../types';
import { checkAndChange } from '../utils/functions';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
const Members = new MemberClass();

export function auth(req: IObject, res: IObject): void {
    Members.auth(req.body.username, req.body.password)
        .then(result => {
            const token = sign({
                exp: Math.floor(Math.floor(Date.now() / 1000) + (6 * 60 * 60)),
                expiresIn: 20000,
                userId: result.id,
                userPermissions: result.permissions
            }, config.secret)
            res.cookie('user_token', `${token}`, { maxAge: 3600000, httpOnly: true, domain: config.domain }) //process.env.NODE_ENV == 'production' ? 'None' : 'Lax'                   //secure: process.env.NODE_ENV == 'production' ? true : false,
            res.cookie('user_id', `${result.id}`, { maxAge: 3600000, httpOnly: true, domain: config.domain }) //process.env.NODE_ENV == 'production' ? 'None' : 'Lax'                   //secure: process.env.NODE_ENV == 'production' ? true : false,
            res.cookie('user_auth', `${result.id}`, { maxAge: 3600000, httpOnly: false, domain: config.domain }) //process.env.NODE_ENV == 'production' ? 'None' : 'Lax'                   //secure: process.env.NODE_ENV == 'production' ? true : false,
            res.status(200).json(checkAndChange({
                auth: {
                    auth: true,
                },
            }))
        })
        .catch(error => res.json(checkAndChange(error)))
}

export function getMembers(req: IObject, res: IObject): void {
    const userInfos: IUserInfos = {
        id: req.user.id,
        permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
    }
    Members.getAll(userInfos, req.params.page)
        .then(result => res.status(200).json(checkAndChange(result)))
        .catch(error => res.json(checkAndChange(error)))
}
export function getMember(req: IObject, res: IObject): void {
    const userInfos: IUserInfos = {
        id: req.user.id,
        permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
    }
    Members.get(userInfos, req.params.userId)
        .then(result => res.status(200).json(checkAndChange(result)))
        .catch(error => res.json(checkAndChange(error)))
}
export function createMember(req: IObject, res: IObject): void {
    Members.add(
        req.body.nickname,
        0,
        0,
        req.body.avatar,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.age,
        req.body.phone_number,
        req.body.email,
        Date.now()
    )
        .then(result => res.status(201).json(checkAndChange(result)))
        .catch(error => res.json(checkAndChange(error)))
}

export function updateMember(req: IObject, res: IObject): void {
    const newSettings: IMember = {
        id: req.body.user_id,
        nickname: req.body.nickname,
        permissions: req.body.permissions,
        banishment: req.body.banishment,
        avatar: req.body.avatar,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        phone_number: req.body.phone_number,
        email: req.body.email
    }
    const userInfos: IUserInfos = {
        id: req.user.id,
        permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
    }
    Members.put(userInfos, req.params.userId, newSettings)
        .then(result => res.status(200).json(checkAndChange(result)))
        .catch(error => res.json(checkAndChange(error)))
}

export function deleteMember(req: IObject, res: IObject): void {
    const userInfos: IUserInfos = {
        id: req.user.id,
        permissions: req.user.permissions || [{ value: 0, permission: 'NONE' }]
    }
    Members.delete(userInfos, req.params.userId)
        .then(result => res.status(200).json(checkAndChange(result)))
        .catch(error => res.json(checkAndChange(error)))
}

export function disconnect(req: IObject, res: IObject): void {
    res.clearCookie('user_auth')
    res.clearCookie('user_id')
    res.clearCookie('user_token')

    res.status(200).json(checkAndChange('success'))

}