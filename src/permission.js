import store from '@/store'
import router from './router'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
const loginPath = '/login'
const notFoundPath = '/404'

// 定义白名单
const whiteList = [loginPath, notFoundPath]

// 监听路由的变化
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  // 如果有token
  if (token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    // 判断都是否去登录页
    if (to.path === loginPath) {
      // 强制跳转主页
      next('/')
    } else {
      // 直接放行
      next()
    }
  } else {
    // 没有token的情况 判断是否在白名单,如果在放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果不在 跳转登录页
      next(loginPath)
    }
  }
})
router.afterEach(() => {
  NProgress.done()
}, 2000)
