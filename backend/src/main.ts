import { App } from './app';
import { config } from './config';

const server: App = new App(config)
server.start();

export default server