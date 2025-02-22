/**
 * 设置缓存
 */
export default {
  setCache: function (key, val) {
    return window.localStorage.setItem(key, JSON.stringify(val))
  },
  getCache: function (key) {
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch {
      return {}
    }
  },
  delCache: function (key) {
    return window.localStorage.removeItem(key)
  }
}
