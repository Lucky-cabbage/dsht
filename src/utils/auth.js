import Cookies from 'js-cookie'
// // Cookies相当于本地存储
const TokenKey = 'dsht_token' // token存储到本地存储>>key
const timekey = 'time_key'
// // 在本地里取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// // 在本地里存token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// // 在本地里删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export const getTimeS = () => {
  return Cookies.get(timekey)
}

// 设置时间戳
export const setTime = () => {
  return Cookies.set(timekey, Date.now())
}
