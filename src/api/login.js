import request from '@/utils/request'
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}
// 获取菜单列表
export const getMenus = () => {
  return request({
    method: 'GET',
    url: 'menus'
  })
}
// 获取用户列表
export const getUsers = (params) => {
  return request({
    method: 'GET',
    url: 'users',
    params
  })
}
// 修改用户状态
export const putUid = (uId, type) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}

// 删除
export function deleteId(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 添加用户
export const postUsers = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

export const putUsers = (id) => {
  return request({
    url: `users/${id}`,
    method: 'PUT'
  })
}
