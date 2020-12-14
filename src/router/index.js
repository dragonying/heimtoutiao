import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
const Login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/home.vue')
const Index = () => import('../views/home/index/index.vue')
const My = () => import('../views/home/my/my.vue')
const Detail = () => import('../views/detail/detail.vue')
const Info = () => import('../views/info/info.vue')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  // 登录路由:登录成功之后，应该跳转到我的页面
  { path: '/login', component: Login },
  // 验证登录路由:登录成功之后，返回到上一个页面
  { path: '/checkLogin', component: Login },
  // 注册 home 路由
  {
    path: '/home',
    component: Home,
    redirect: '/home/my',
    children: [
      { path: 'index', component: Index }, // 主页路由
      { path: 'my', component: My }, // 我的路由
      {
        path: 'search',
        component: resolve => require(['@/views/home/search/search'], resolve) // 搜索页面
      } // 搜索路由
    ]
  },
  {
    path: '/searchResult/:key',
    component: resolve => require(['@/views/searchResult/searchResult'], resolve) // 搜索结果页面
  },
  // 文章详情
  { path: '/detail/:artid', component: Detail },
  { path: '/info', component: Info },

  // 测试demo路由，用于测试代码段，切勿写业务代码
  {
    path: '/test',
    component: resolve => require(['@/test/index'], resolve),
    redirect: '/test/camera',
    // 子路由
    children: [
      {
        path: 'index',
        component: resolve => require(['@/test/camera'], resolve)
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log('from:', from)
  console.log('to:', to)
  next()
})
// 全局后置守卫
router.afterEach(async to => {
  console.log('to:', to)
})

export default router
