import request from '@/utils/request'
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
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}
