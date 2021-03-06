import { readdirSync, statSync } from 'fs';
import { createServer } from "http";
import { join } from 'path';
import * as express from 'express';
import { Server } from "socket.io";
import { Iconfig, IObject } from './types'
import { debug } from './utils/functions';
import { auth } from './events/auth';
//classes
import { ChatClass } from './assets/classes/chat';
const Chat = new ChatClass();

//const sessions = new Map();

export class App {
    private app: express.Application;
    public port: number;
    public config: Iconfig;
    public httpServer: any
    //public sessionsMap: Map<string, IObject>
    public io: Server | undefined
    public debug = debug;
    constructor(config: Iconfig) {
        this.app = express();
        this.port = config.port;
        this.config = config
        console.log('Starting...')
        this.httpServer = createServer(this.app);
        this.httpServer.listen(this.port);
        //this.sessionsMap = new Map();
    }
    private handleRoutes(): void {
        readdirSync(join(__dirname, 'routes')).forEach(dir => {
            const routes = readdirSync(join(__dirname, `routes/${dir}`)).filter(file => file.endsWith('.js'))
            for (const file of routes) {
                const getFileName = require(join(__dirname, `routes/${dir}/${file}`))
                this.app.use(`/api/v${getFileName.infos.version}/${getFileName.infos.route}`, getFileName.infos.router)
                debug('[ROUTE_LOADED]', '\x1b[45m', `Route chargée : /api/v${getFileName.infos.version}/${getFileName.infos.route}`);
            }
        })
        this.app.use('/cdn', express.static(join(__dirname, '../public/uploads')));
    }
    private async handleMiddlewares(): Promise<void> {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        if (!this.config.production) {
            const morgan = require('morgan')
            this.app.use(morgan('dev'))
            // import('morgan').then(m => this.app.use(m('dev')))
        }


        this.app.use(function (req: IObject, res: IObject, next: Function) {
            const origin = req.headers.origin;
            if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next()
        })

    }
    private handleEvents(): void {
        const io = new Server(this.httpServer, {
            cors: {
                origin: "http://192.168.0.30:8080",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        this.io = io;
        io.sockets.on('connection', (socket) => {
            const user = auth(this, socket)
            const rooms = Chat.rooms;
            for (const room of rooms) {
                if (user.status === 'success') {
                    if (!room[1].permissions && room[1].type == '01') {
                        socket.join(`01${room[1].id}`)
                        console.log(`Joined 01${room[1].id}`)
                    }
                } else {
                    console.log('Access denied for user')
                }
            }
            readdirSync(join(__dirname, 'events'))
                .filter(function (file) {
                    return statSync(join(__dirname, 'events', file)).isDirectory();
                })
                .forEach(dir => {
                    const events = readdirSync(join(__dirname, `events/${dir}`)).filter(file => file.endsWith('.js'))
                    for (const eventFile of events) {
                        const getFileName = require(join(__dirname, `events/${dir}/${eventFile}`))
                        debug('[EVENT_LOADED]', '\x1b[45m', getFileName.infos.event);
                        socket.on(getFileName.infos.event, (data: any, callback: Function) => {
                            debug('[EVENT_RECEVIED]', '\x1b[44m', getFileName.infos.event);
                            if (getFileName.infos.connection) {
                                const authUser = auth(this, socket)
                                if (authUser!.status === 'error') return debug('[EVENT_CONNECTION_ERROR]', '\x1b[41m', `${getFileName.infos.event} : ${authUser!.error}`)
                                getFileName.run(this, socket, data, authUser, callback)
                            } else getFileName.run(this, socket, data)
                        });
                    }
                })
        })
    };
    public start(): void {
        this.handleMiddlewares();
        this.handleRoutes();
        this.handleEvents();
    }
}