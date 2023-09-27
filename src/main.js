import './styles/main.css'
import './SCSS/bootstrap-grid.min.css'; //只引入bootstrap grid

import { createApp } from 'vue'
import 'animate.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
