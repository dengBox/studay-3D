import { RouteRecordRaw } from 'vue-router'

const oneDayRoute: Array<RouteRecordRaw> = [
  {
    path: '/day_1',
    name: 'day_1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "day_1" */ '../views/day-1/Index.vue')
  }
]

export default oneDayRoute
