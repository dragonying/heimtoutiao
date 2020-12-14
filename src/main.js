// 导入 vue
import Vue from 'vue'
// 导入了根组件：页面的结构
import App from './App.vue'
// 导入了路由
import router from './router'
// 导入了 vuex
import store from './store'
// 导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入自己封装的插件
import plugin from '@/utils/plug.js'
// 导入适配的插件
import 'amfe-flexible/index.js'
// 过滤器
import * as filters from '@/filter/common'

// 全局注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.use(Vant)

// 使用插件
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router, // 挂载了路由
  store, // 挂载了 vuex
  render: h => h(App) // 将 App.vue 渲染到 Vue 中
}).$mount('#app')
