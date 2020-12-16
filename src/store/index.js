import Vue from 'vue'
import Vuex from 'vuex'
import { userSelfInfo } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: undefined,
    isLogin: false // 标识登录
  },
  mutations: {
    // 设置授权信息
    setAuthInfo: function (state, value) {
      state.userInfo = value
      if (value) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    }
  },
  actions: {
    // 更新用户信息
    async refreshUserInfo (context) {
      const res = await userSelfInfo()
      context.commit('setAuthInfo', res.data)
    }
  },
  getters: {},
  modules: {}
})
