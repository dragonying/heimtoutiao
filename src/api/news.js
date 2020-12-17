import request from '@/utils/request'
// 频道新闻推荐_V1.1
// channel_id是 频道ID
// timestamp 是 时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
// with_top 是 0或1 是否包含置顶，进入页面第一次请求时要包含置顶文章，1 - 包含置顶，0 - 不包含
export const appArticles = ({ channelId, withTop }) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id,
      with_top,
      timestamp: new Date().getTime()
    },
    unNeedToken: true
  })
}
// 根据ID获得文章信息
export const userArticles = id => {
  return request({
    url: '/app/v1_0/articles/' + id,
    method: 'GET'
  })
}
// 对文章点赞和取消对文章点赞
export const giveLike = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/article/likings',
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}
// 对文章不喜欢和取消对文章不喜欢
export const disLike = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/article/dislikes',
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}
// 添加评论或评论回复
export const replyComments = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/comments',
    method: isDelete ? 'POST' : 'GET'
  }
  isDelete ? (option.data = target) : (option.params = target)
  return request(option)
}
// 收藏文章和取消收藏文章
export const collectArticle = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/article/collections',
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}
// 对评论或评论回复点赞
export const commentLike = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/comment/likings',
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}
