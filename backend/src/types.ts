import { Router } from "express";

//Config
export interface Iconfig {
    readonly port: number;
    readonly production?: Boolean;
    readonly domain: string
    readonly database: {
        readonly host: string;
        readonly user: string;
        readonly password: string;
        readonly database: string;
    }
    readonly secret: string;
    readonly permissions: Array<any>
    readonly colors: Array<string>
}
//Router
export interface Iroute {
    route: string;
    version: number;
    router: Router;
}

//Responce
export interface IResponce {
    status: string;
    timestamp: number;
    result?: any
    message?: string
}
//Object
export interface IObject {
    [index: string]: any
}

//Member
export interface IMember {
    id: number;
    nickname: string | null;
    permissions: number;
    banishment: number;
    avatar: string;
    password: string;
    first_name: string;
    last_name: string;
    age: string;
    phone_number: string;
    email: string;
    date_insert?: number
}

export interface IUserInfos {
    id: number;
    permissions: Array<IObject>;
}