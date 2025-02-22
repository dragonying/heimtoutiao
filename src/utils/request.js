import axios from 'axios'
import { token } from '@/utils/storage'
import router from '@/router'
import { Toast } from 'vant'
import Store from '@/store'
import { SERVER_STATUS } from '@/config/enum'
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
      if (tk) {
        config.headers.Authorization = `Bearer ${
          config.useFreshToken ? tk.refresh_token : tk.token
        }`
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
    let tip = '未知错误'
    const status = error.response.status
    const info = SERVER_STATUS[String(status)]
    if (info) {
      if ([401, 403].includes(status)) {
        token.del()
        Store.commit('setAuthInfo', '')
        router.push('/login')
      }
      tip = info.title
    }
    Toast.fail(tip)
    return Promise.reject(error)
  }
)

/**
 * 请求方法
 * @param {*} option 属性
 */
export default function (option = {}) {
  return instance(option).catch(err => {
    console.error(err)
  })
}
