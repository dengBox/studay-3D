import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/scss/index.scss'

import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
