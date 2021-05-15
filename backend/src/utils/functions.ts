import { IResponce, IObject } from '../types';

export function success(result: any): IResponce {
    const responce: IResponce = {
        status: 'success',
        timestamp: Date.now(),
        result: result
    }
    return responce
}

export function error(message: string): IResponce {
    const responce: IResponce = {
        status: 'error',
        timestamp: Date.now(),
        message: message
    }
    return responce
}

export function isErr(param: any): Boolean {
    return param instanceof Error
}

export function checkAndChange(this: any, obj: any): void {
    if (this.isErr(obj)) return this.error(obj.message || obj)
    else return this.success(obj)
}

export function hasPermissions(userPermissions: Array<IObject>, permissionsRequested: Array<string>): Boolean {
    if (!userPermissions.length) return false;
    if (userPermissions[0].permission === 'ADMINISTRATOR') return true;
    for (let permRequested of permissionsRequested) {
        if (!permissionsRequested.includes(permRequested)) return false;
    }
    return true;
}

export function debug(title: string, color: string, message: string) {
    const date = new Date(Date.now());
    const hour = date.getHours()
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const start = `${hour}:${minutes}:${seconds} : ${color}\x1b[30m${title}\x1b[0m`
    console.log(`${start} - ${message}`)
}