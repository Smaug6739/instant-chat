import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../public/css/main.css"
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import socket from './socket';


createApp(App)
	.use(socket)
	.use(store)
	.use(router)
	.mount('#app');