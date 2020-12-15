/** 缓存管理 */
import cache from '@/utils/cache'

/** 基对象 */
const baseObj = {
  ...cache,
  set: function (data) {
    return this.setCache(this.key, data)
  },
  get: function () {
    return this.getCache(this.key)
  },
  del: function () {
    return this.delCache(this.key)
  }
}

/* 所有的缓存对象只需要继承baseObj，并设置key即可 */

/** 文章搜索历史  */
export const searchCache = {
  key: 'USER_SEARCH_HISTORY',
  ...baseObj
}

/* 用户浏览记录 */
export const scanCache = {
  key: 'USER_SCAN_HISTORY',
  ...baseObj
}

/* 授权 token */
export const token = {
  key: process.env.VUE_APP_TOKEN_NAME || 'heima_token',
  ...baseObj
}
