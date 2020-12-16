import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { userSelfInfo, usersDetail } from '@/api/user'
// import { token } from '@/utils/storage'

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
    refreshUserInfo (context) {
      axios.all([userSelfInfo(), usersDetail()]).then(
        axios.spread(function () {
          const userData = {}
          for (const index in arguments) {
            for (const key in arguments[index].data) {
              userData[key] = arguments[index].data[key]
            }
          }
          context.commit('setAuthInfo', userData)
        })
      )
    }
  },
  getters: {},
  modules: {}
})
