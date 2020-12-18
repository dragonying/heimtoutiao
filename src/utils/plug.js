import { Toast } from 'vant'

// 全局组件注册
const selfComps = {
  navBar: () => import('@/components/navBar'),
  cell: () => import('@/components/cell')
}

// 全局方法注册
const methods = {
  $showLoad: function (txt) {
    Toast.loading({
      message: txt,
      forbidClick: true,
      duration: 0
    })
  }
}

// 写法一 对象
export default {
  //  Vue.use(js代码) 该对象的install方法就会自动执行，同时将Vue传递给install方法
  install: function (Vue) {
    // 注册全局组件
    for (const key in selfComps) {
      Vue.component(key, selfComps[key])
    }

    // 消息提示
    for (const key in methods) {
      Vue.prototype[key] = methods[key]
    }
  }
}
