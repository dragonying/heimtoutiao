import axios from 'axios'
import { token } from '@/utils/storage'
// 相当于axios副本
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL // 设置基地址
  //   withCredentials: true // 配置接收cookie
})

// 等待敖坤写好登录即可， 临时处理登录问题
const getToken = async () => {
  await axios.get(process.env.VUE_APP_URL + '/app/v1_0/sms/codes/13911111199')

  const ret = await axios.post(
    process.env.VUE_APP_URL + '/app/v1_0/authorizations',
    {
      mobile: '13911111199',
      code: '246810'
    }
  )
  token.set({ time: new Date().getTime(), tk: ret.data.data.token })
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // console.log(config.method)
    // if (['get', 'patch'].includes(config.method)) {
    //   config.headers['Content-Type'] = 'application/json'
    // } else {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // }
    config.headers['Content-Type'] = 'application/json'

    // 默认需要token
    if (!config.unNeedToken) {
      // 临时header使用
      let tk = token.get()
      console.log(tk)
      if (!tk || (tk && tk.time && new Date().getTime() - tk.time > 50000)) {
        getToken()
        tk = token.get()
      }

      config.headers.Authorization = `Bearer ${tk.tk}`
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
