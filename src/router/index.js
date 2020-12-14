import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
const Login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/home.vue')
const Index = () => import('../views/home/index/index.vue')
const My = () => import('../views/home/my/my.vue')
const Search = () => import('../views/home/search/search.vue')
const SearchResult = () => import('../views/searchResult/searchResult.vue')
const Detail = () => import('../views/detail/detail.vue')
const Info = () => import('../views/info/info.vue')

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
    redirect: '/my',
    children: [
      { path: '/index', component: Index }, // 主页路由
      { path: '/my', component: My }, // 我的路由
      { path: '/search', component: Search } // 搜索路由
    ]
  },
  { path: '/searchResult/:key', component: SearchResult },
  // 文章详情
  { path: '/detail/:artid', component: Detail },
  { path: '/info', component: Info }
]

const router = new VueRouter({
  routes
})

export default router
