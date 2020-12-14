import Vue from 'vue'
import Vuex from 'vuex'
import { apiGetUserInfo } from '../api/use.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 给userInfo 赋值
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 调用 mutations 中的 setUserInfo
    async setUserInfo (context) {
      // 请求服务器得到用户信息
      const res = await apiGetUserInfo()
      context.commit('setUserInfo', res.data.data)
    }
  },
  modules: {}
})
