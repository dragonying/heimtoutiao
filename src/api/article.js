// 封装所有与新闻相关的网络请求
import myhttp from '@/utils/request.js'

// 封装方法：根据频道 id 得到文章数据
export function apiGetArticle (channelid) {
  return myhttp({
    url: '/app/v1_1/articles',
    method: 'GET',
    needToken: true,
    params: {
      channel_id: channelid,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}

// 封装方法：对文章不喜欢
export function apiDislike (artid) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    needToken: true,
    data: {
      target: artid
    }
  })
}

// 封装方法：举报文章
export function apiReportArticle ({ artid, type }) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    needToken: true,
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 封装方法： 拉黑作者
export function apiBlackAuthor (autid) {
  return myhttp({
    url: '/app/v1_0/user/blacklists',
    method: 'POST',
    needToken: true,
    data: {
      target: autid
    }
  })
}

// 封装方法：得到文章详情
export function apiGetDetail (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    needToken: true
  })
}

// 封装方法：对文章点赞
export function apiZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    },
    needToken: true
  })
}

// 封装方法：取消文章的点赞
export function apiDiszan (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`, // 这个路径中需要传入一个参数键为：target
    method: 'DELETE',
    needToken: true
  })
}
