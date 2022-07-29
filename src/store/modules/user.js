import { getToken, removeToken, setTime, setToken } from '@/utils/auth'
import { login } from '@/api/login'
// // 状态
const state = {
  token: getToken(), // 初始化的时候吧本地存储里面的token复制给vuex默认值
  UserInfo: {}
}
// // 修改状态
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  //   // 修改token的方法
  //   // 1.设置token
  //   // 2.vuex
  //   // 3.Cookies
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 移除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  removeUserInfo(state) {
    state.UserInfo = {}
  }
}
// // 执行异步
const actions = {
  // 登录请求>>commit>>mutations
  async login(context, data) {
    // 调用登录的请求接口
    const res = await login(data)
    console.log(res)
    // 登录成功
    setTime()
    console.log(res.data.data.token)
    // 获取到的token存储到vuex/cookie
    context.commit('setToken', res.data.data.token)
  },
  // 获取用户资料
  //   async getUserInfo(context) {
  //     const res = await getUserInfo()
  //     const baseInfo = await getUserDetailById(res.userId) // 为了获取头像
  //     // 存储到vuex
  //     context.commit('setUserInfo', { ...res, ...baseInfo })
  //   },
  // 退出登录功能
  logOut(context) {
    // 清除用户信息
    context.commit('removeUserInfo')
    context.commit('removeToken')
  }
}
export default {
  namespaced: true,
  // state:state
  state,
  mutations,
  actions
}
