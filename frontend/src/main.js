import { createApp } from 'vue';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../public/css/main.css"
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import utilPlugin from './util/functions';

import getItem from './plugins/getItem.js';
import './plugins/progress/progress.css';



import socket from './socket';



createApp(App)
	.use(socket)
	//.use(loader)
	.use(utilPlugin)
	.use(getItem)
	.use(store)
	.use(router)
	.mount('#app');