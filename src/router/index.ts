import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Common from '../views/Common.vue'
// import Home from '../views/Home.vue'

// 自动导入其他 router 文件
const context = require.context('./', true, /.ts$/)
let routerList: Array<RouteRecordRaw> = []

context.keys().forEach(k => {
  // 排除index.js
  if (k !== './index.ts') routerList = [...routerList, ...context(k).default]
})

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Common
  },
  ...routerList
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
