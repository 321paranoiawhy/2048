import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 跳转路由
  // GetStartedView.vue
  {
    path: '/get-started',
    name: 'get-started',
    // 按需引入 (箭头函数)
    // 如果路由未访问, 则不加载该组件 (懒加载, 节约性能)
    component: () => import('../views/GetStartedView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
