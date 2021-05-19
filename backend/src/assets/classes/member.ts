import db from '../../models/db';
import { config } from '../.././config'
import { IMember, IObject, IUserInfos } from '../../types';
import { hasPermissions } from '../../utils/functions'
import { hash, compare } from "bcrypt";

export class MemberClass {

    public auth(username: string, password: string): Promise<IObject> {
        return new Promise((resolve, reject) => {
            if (!username || username && username.trim() === '') return reject(new Error('[MISSING_PARAMETER] Missing username parameter'));
            if (!password || password && password.trim() === '') return reject(new Error('[MISSING_PARAMETER] Missing password parameter'));
            db.query('SELECT * FROM members WHERE member_nickname = ? LIMIT 1', [username], (err, result: Array<IObject>): void => {
                if (err) return reject(new Error(err.message))
                if (result[0]) {
                    compare(password, result[0].member_password)
                        .then((valid: Boolean): void => {
                            if (!valid) return reject(new Error('Bad username/password.'))
                            else return resolve(result[0])
                        })
                        .catch(() => {
                            return reject(new Error('Error with password hash'))
                        })
                } else return reject(new Error('Bad username/password.'))
            })
        })
    }

    public get(user: IUserInfos, userId: number): Promise<IObject> {
        return new Promise((resolve, reject) => {
            if (!userId) return reject(new Error('Missing userId param.'))
            if (!hasPermissions(user.permissions, ['VIEW_MEMBERS']) && user.id != userId) return reject(new Error('Bad permissions.'))
            db.query('SELECT * FROM members WHERE member_id = ? LIMIT 1', [userId], (err, result) => {
                if (err) return reject(new Error(err.message))
                resolve(result[0])
            })
        })
    }

    public getUserPublic(id: string): IObject {
        return new Promise((resolve, reject) => {
            if (!id) return reject(new Error('Missing userId param.'))
            db.query('SELECT member_nickname, member_avatar,member_color FROM members WHERE member_id = ? LIMIT 1', [id], (err, result) => {
                if (err) return reject(new Error(err.message))
                resolve(result[0])
            })
        })
    }

    public getAll(user: IUserInfos, page: (string)): Promise<IObject> {
        return new Promise((resolve, reject) => {
            console.log(user)
            const offset = (parseInt(page) * 20) - 20
            if (!user || !user.id) return reject(new Error('Missing user header.'))
            if (!hasPermissions(user.permissions, ['VIEW_MEMBERS'])) return reject(new Error('Bad permissions.'))
            db.query('SELECT * FROM members LIMIT 20 OFFSET ?', [offset], (err, result) => {
                if (err) return reject(new Error(err.message))
                resolve(result)
            })
        })
    }

    public add(
        nickname: string,
        permissions: number,
        banishment: number,
        avatar: string,
        password: string,
        first_name: string,
        last_name: string,
        age: string,
        phone_number: string,
        email: string,
        dateInsert: number
    ): Promise<IObject | Error> {
        return new Promise<IObject | Error>((resolve, reject) => {
            if (!nickname || nickname && nickname.trim() === '') return reject(new Error("Missing nickaname param."))
            if (!avatar || avatar && avatar.trim() === '') avatar = ''
            if (!password || password && password.trim() === '') return reject(new Error("Missing password param."))
            if (!first_name || first_name && first_name.trim() === '') first_name = ''
            if (!last_name || last_name && last_name.trim() === '') last_name = ''
            if (!age) return reject(new Error("Missing age param."))
            if (!phone_number || phone_number && phone_number.trim() === '') phone_number = ''
            if (!email || email && email.trim() === '') return reject(new Error("Missing email param."))
            if (!dateInsert) return reject(new Error("Missing date insert param."))
            if (typeof nickname !== 'string') return reject(new Error("nickname must be a string"))
            if (typeof permissions !== 'number') return reject(new Error("permissions must be a number"))
            if (typeof banishment !== 'number') return reject(new Error("banishment must be a number"))
            if (typeof avatar !== 'string') return reject(new Error("avatar must be a string"))
            if (typeof password !== 'string') return reject(new Error("password must be a string"))
            if (typeof first_name !== 'string') return reject(new Error("first_name must be a string"))
            if (typeof last_name !== 'string') return reject(new Error("last_Name must be a string"))
            if (typeof age !== 'string') return reject(new Error("age must be a number"))
            if (typeof phone_number !== 'string') return reject(new Error("phone_number must be a string"))
            if (typeof email !== 'string') return reject(new Error("email must be a string"))
            const color = config.colors[Math.floor(Math.random() * config.colors.length)]
            hash(password, 10)
                .then((hash: string) => {
                    db.query('INSERT INTO members (`member_nickname`, `member_permissions`, `member_banishment`,`member_color`, `member_avatar`, `member_password`, `member_first_name`, `member_last_name`, `member_age`, `member_phone_number`, `member_email`, `member_date_insert`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [nickname, permissions, banishment, color, avatar, hash, first_name, last_name, age, phone_number, email, dateInsert], (err, result: Array<IObject>): void => {
                        if (err) return reject(new Error(err.message))
                        return resolve(result)
                    })
                })
                .catch(() => {
                    reject(new Error('error whit password hash'))
                })
        })
    }
    public put(user: IUserInfos, userId: number, newSettings: IMember): Promise<IObject | Error> {
        return new Promise<IObject | Error>((resolve, reject) => {
            if (!hasPermissions(user.permissions, ['UPDATE_MEMBERS']) && user.id != userId) return reject(new Error('Bad permissions.'))
            let passwordHash: string;
            if (newSettings.permissions) newSettings.permissions = parseInt(`${newSettings.permissions}`)
            if (newSettings.banishment) newSettings.banishment = parseInt(`${newSettings.banishment}`)
            if (newSettings.nickname && typeof newSettings.nickname !== 'string') return reject(new Error("nickname must be a string"))
            if (newSettings.permissions && typeof newSettings.permissions !== 'number') return reject(new Error("permissions must be a number"))
            if (newSettings.banishment && typeof newSettings.banishment !== 'number') return reject(new Error("banishment must be a number"))
            if (newSettings.avatar && typeof newSettings.avatar !== 'string') return reject(new Error("avatar must be a string"))
            if (newSettings.password && typeof newSettings.password !== 'string') return reject(new Error("password must be a string"))
            if (newSettings.first_name && typeof newSettings.first_name !== 'string') return reject(new Error("first_name must be a string"))
            if (newSettings.last_name && typeof newSettings.last_name !== 'string') return reject(new Error("last_Name must be a string"))
            if (newSettings.age && typeof newSettings.age !== 'string') return reject(new Error("age must be a number"))
            if (newSettings.phone_number && typeof newSettings.phone_number !== 'string') return reject(new Error("phone_number must be a string"))
            if (newSettings.email && typeof newSettings.email !== 'string') return reject(new Error("email must be a string"))
            db.query('SELECT * FROM members WHERE member_id = ? LIMIT 1', [userId], async (err, result: Array<IObject>) => {
                if (err) return reject(new Error(err.message))
                if (newSettings.permissions && !hasPermissions(user.permissions, ['ADMINISTRATOR'])) return reject(new Error('You don\'t have permissions for change permissions value.'))
                if (newSettings.banishment && !hasPermissions(user.permissions, ['BAN_MEMBERS'])) return reject(new Error('You don\'t have permissions for change banishment value.'))
                if (newSettings.password) passwordHash = await hash(newSettings.password, 10)
                else passwordHash = result[0].password
                const userSettings: IMember = {
                    id: result[0].id,
                    nickname: newSettings.nickname || result[0].nickname,
                    permissions: newSettings.permissions || result[0].permissions,
                    banishment: newSettings.banishment || result[0].banishment,
                    avatar: newSettings.avatar || result[0].avatar,
                    password: passwordHash,
                    first_name: newSettings.first_name || result[0].first_name,
                    last_name: newSettings.last_name || result[0].last_name,
                    age: newSettings.age || result[0].age,
                    phone_number: newSettings.phone_number || result[0].phone_number,
                    email: newSettings.email || result[0].email,
                    date_insert: result[0].date_insert
                }
                db.query('UPDATE `members` SET `nickname` = ?, `permissions` = ?, `banishment` = ?, `avatar` = ?, `password` = ?, `first_name` = ?, `last_name` = ?, `age` = ?, `phone_number` = ?, `email` = ?, `date_insert` = ? WHERE (`id` = ?);',
                    [userSettings.nickname, userSettings.permissions, userSettings.banishment, userSettings.avatar, userSettings.password, userSettings.first_name, userSettings.last_name, userSettings.age, userSettings.phone_number, userSettings.email, userSettings.date_insert, userId],
                    (err, result) => {
                        if (err) return reject(new Error(err.message))
                        resolve(userSettings)
                    })
            })
        })
    }
    public delete(user: IUserInfos, userDelete: number): Promise<IObject | Error> {
        return new Promise<IObject | Error>((resolve, reject) => {
            if (!hasPermissions(user.permissions, ['DELETE_MEMBERS']) && user.id != userDelete) return reject(new Error('Bad permissions.'))
            db.query('DELETE FROM members WHERE member_id = ?', [userDelete], (err, result) => {
                if (err) return reject(new Error(err.message))
                resolve(result)
            })
        })
    }
}