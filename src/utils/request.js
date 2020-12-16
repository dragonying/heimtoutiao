import axios from 'axios'
import { token } from '@/utils/storage'
import router from '@/router'
import { Toast } from 'vant'
import Store from '@/store'
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
      const tk = token.get()
      if (tk && tk.token) {
        config.headers.Authorization = `Bearer ${tk.token}`
      } else {
        Toast.fail('请登录')
        router.push('/login')
      }
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
    // console.log(error.response.status)
    if (error.response.status === 403 || error.response.status === 401) {
      token.del()
      Store.commit('setAuthInfo', '')
      console.log(Store)
      Toast.fail('请登录')
      router.push('/login')
    }
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
