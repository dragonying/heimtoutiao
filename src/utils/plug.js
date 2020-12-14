// 全局组件注册

// 写法一 对象
export default {
  //  Vue.use(js代码) 该对象的install方法就会自动执行，同时将Vue传递给install方法
  install: function (Vue) {
    // Vue.component('navBar', navBar)
  }
}

// 写法二 方法
// export default function (Vue) {
// }
