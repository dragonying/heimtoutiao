import axios from 'axios'
// 相当于axios副本
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL // 设置基地址
  //   withCredentials: true // 配置接收cookie
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json'

    // 默认需要token
    if (!config.unNeedToken) {
      // 临时header使用
      config.headers.Authorization =
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDgwMTk1MDMsInVzZXJfaWQiOjExNjE5MDkzNTI3ODk5NjY4NDgsInJlZnJlc2giOmZhbHNlfQ.1aWYj59ZvUa2FGzmTYYwCiY8wNbqCrrB0hTVZQ1Oyaw'
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

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

/**
 * 请求方法
 * @param {*} option 属性
 */
export default function (option = {}) {
  return instance(option)
}
