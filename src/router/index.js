import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { token } from '@/utils/storage'
import { freshAuthorizations } from '@/api/user'
import { Toast } from 'vant'
// 导入组件
const Login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/home.vue')
const Index = () => import('../views/home/index/index.vue')
const My = () => import('../views/home/my/my.vue')
const Detail = () => import('../views/detail/detail.vue')
const Info = () => import('../views/info/info.vue')
const video = () => import('../views/home/video/video.vue')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
// 不需要登录的接口 添加meta.unNeedLogin=true
const routes = [
  // 登录路由:登录成功之后，应该跳转到我的页面
  {
    path: '/login',
    alias: '/',
    component: Login,
    meta: {
      unNeedLogin: true // 不需要登录可访问的接口
    }
  },
  // 验证登录路由:登录成功之后，返回到上一个页面
  { path: '/checkLogin', component: Login },
  // 注册 home 路由
  {
    path: '/home',
    component: Home,
    redirect: '/home/my',
    children: [
      { path: 'index', component: Index }, // 主页路由
      {
        path: 'my',
        component: My,
        meta: {
          unNeedLogin: true
        }
      }, // 我的路由
      {
        path: 'video',
        component: video,
        meta: {
          unNeedLogin: true
        }
      }, // 视频
      {
        path: 'search',
        component: resolve => require(['@/views/home/search/search'], resolve), // 搜索页面
        meta: {
          unNeedLogin: true
        }
      } // 搜索路由
    ]
  },
  {
    path: '/searchResult/:key',
    component: resolve =>
      require(['@/views/searchResult/searchResult'], resolve) // 搜索结果页面
  },
  // 文章详情
  { path: '/detail/:artid', component: Detail },
  { path: '/info', component: Info },
  // 用户相关
  {
    path: '/user',
    redirect: '/user/setting',
    component: resolve => require(['@/views/home/my/index'], resolve),
    children: [
      {
        path: 'setting',
        component: resolve => require(['@/views/home/my/setting'], resolve) // 系统设置
      }, // 搜索路由
      {
        path: 'authentication',
        component: resolve =>
          require(['@/views/home/my/authentication'], resolve) // 身份认证
      },
      {
        path: 'edit',
        component: resolve => require(['@/views/home/my/edit'], resolve) // 编辑
      },
      {
        path: 'center',
        component: resolve => require(['@/views/home/my/center'], resolve) // 个人中心
      },
      {
        path: 'feedback',
        component: resolve => require(['@/views/home/my/feedBack'], resolve), // 意见反馈
        meta: {
          unNeedLogin: true
        }
      },
      {
        path: 'robot',
        component: resolve => require(['@/views/home/my/robot'], resolve), // 小智同学
        meta: {
          unNeedLogin: true
        }
      },
      {
        path: 'userinfo/:id',
        component: resolve => require(['@/views/home/my/userInfo'], resolve) // 个人页面
      },
      {
        path: 'fans',
        component: resolve => require(['@/views/home/my/fans'], resolve) // 关注 粉丝
      },
      {
        path: 'history/:type',
        component: resolve => require(['@/views/home/my/history'], resolve) // 收藏 历史
      }
    ]
  },
  // 测试demo路由，用于测试代码段，切勿写业务代码
  {
    path: '/test',
    component: resolve => require(['@/test/index'], resolve),
    redirect: '/test/index',
    // 子路由
    children: [
      {
        path: 'index',
        component: resolve => require(['@/test/camera'], resolve),
        meta: {
          unNeedLogin: true
        }
      },
      {
        path: 'pic',
        component: resolve => require(['@/test/pic'], resolve),
        meta: {
          unNeedLogin: true
        }
      },
      {
        path: 'start',
        component: resolve => require(['@/test/start'], resolve),
        meta: {
          unNeedLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

function isInLoginPage (path) {
  return ['/login', '/'].includes(path)
}

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // console.log('from:', from)
  // console.log('to:', to)
  const tokenInfo = token.get()
  if (to.meta.unNeedLogin || Store.state.isLogin) {
    // 不需要登录,  已登录如果在登录页则跳转我的
    isInLoginPage(to.path)
      ? Store.state.isLogin
        ? next('/home/my')
        : next()
      : next()
  } else if (!Store.state.isLogin && tokenInfo) {
    //    // 未登录 但是有token 刷新token
    try {
      const res = await freshAuthorizations()
      tokenInfo.token = res.data.token
      token.set(tokenInfo)
      // 访问登录页则调转首页
      isInLoginPage(to.path) ? next('/home/my') : next()
    } catch {
      next('/login?redirect=' + to.fullPath)
    }
  } else {
    // 去登录
    Toast.fail('请先登录')
    // 为了让用户再登录后回到目标地址
    next('/login?redirect=' + to.fullPath)
  }
})
// 全局后置守卫
router.afterEach(async to => {
  // 有token就刷新用户信息
  const tk = token.get()
  if (!Store.state.isLogin && tk && tk.token) {
    Store.dispatch('refreshUserInfo') // 刷新用户信息
  }
})

export default router
