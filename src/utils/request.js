import axios from 'axios'
import { getTimeS } from './auth'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
})
const timeOut = 6000000
// // 如果没有过期 返回true
// // 过期了返回false
function isCheckTime() {
  return Date.now() - getTimeS() < timeOut
}
// // 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 如果存在token,请求的时候吧token携带到请求头
    const token = store.getters.token
    if (token) {
      // token携带到请求头
      if (isCheckTime()) {
        config.headers.Authorization = ` ${token}`
      } else {
        // TODO:提示  退出登录
        Message.error('登录失败,请重新登录')
        store.dispatch('user/logOut')
        router.push('/')
        // return Promise.reject('')
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// // 响应拦截器
// request.interceptors.response.use(
//   (response) => {
//     // 结构从后端返回的数据和状态
//     const {
//       data: { data, meta }
//     } = response
//     // 判断sucess是否为true
//     // true >>请求才是成功的 >>data可用
//     if (meta.status===200) {
//       return data
//     }
//     // 代码走到这里兹证明success不存在 接口有问题
//     Message.error('系统错误')
//     // 失败的promise >>接口请求的地方有报错
//     // eslint-disable-next-line prefer-promise-reject-errors
//     return Promise.reject()
//   },
//   (error) => {
//     // 添加一些错误处理方式
//     // 401 =>退出登录=> 跳转到登录界面
//     if (error.response.status === 401) {
//       // 退出登录u
//       store.dispatch('user/logOut')
//       router.push('/login')
//     }
//     Message.error(error.response?.data?.message || '系统错误')
//     return Promise.reject(error)
//   }
// )
export default request
