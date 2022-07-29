import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/router/index'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    // 登录路由
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 首页路由
    path: '/layout',
    component: () => import('@/layout/index'),
    // 默认显示 重定向
    redirect: '/welcome',
    children: [
      // 首页显示路由
      {
        path: '/welcome',
        component: () => import('@/layout/components/welcome')
      },
      {
        path: '/users',
        component: () => import('@/layout/components/users')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
