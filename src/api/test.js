import axios from 'axios'

// 相当于axios副本
const instance = axios.create({
  baseURL: process.env.VUE_APP_MAX_URL // 设置基地址
})
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data // 只返回结果
  },
  function (error) {
    // 对响应错误做点什么
    // 终止了.then直接 进入.catch
    return Promise.reject(error)
  }
)
// 随机用户
export const randomUser = () => {
  return instance({
    url: '/randomuserlist',
    method: 'get'
  })
}

// 图灵
export const tuling = (userId, content) => {
  return instance({
    url: '/tuling',
    method: 'get',
    params: {
      user: userId,
      txt: content
    }
  })
}
