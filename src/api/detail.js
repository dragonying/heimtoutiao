import request from '@/utils/request'
// 根据ID获得文章信息
export const userArticles = id => {
  return request({
    url: '/app/v1_0/articles/' + id,
    method: 'GET'
  })
}
// 根据被关注的用户id关注用户
export function appV10UserFollowings (data) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data
  })
}
// 取消关注用户
export function appUserFollowings (id) {
  return request({
    url: '/app/v1_0/user/followings/' + id
  })
}
// 对文章点赞 点赞的文章id
export function appArticleLikings (data) {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data
  })
}
// 获取评论或评论回复
export function appComments (params) {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    unNeedToken: true,
    params
  })
}
