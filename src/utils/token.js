/**
 * token 设置
 */
import cache from '@/utils/cache'

const token = {
  key: process.env.VUE_APP_TOKEN_NAME || 'heima_token',
  setToken: function (data) {
    return this.setCache(this.key, data)
  },
  getToken: function () {
    return this.getCache(this.key)
  },
  delToken: function () {
    return this.delCache(this.key)
  }
}
Object.setPrototypeOf(token, cache) // 继承

export default token
