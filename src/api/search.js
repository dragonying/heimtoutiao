import request from '@/utils/request'

// 搜索结果
export const search = par => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: par
  })
}

// 获取联想建议
export const suggestion = par => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: { q: par }
  })
}

// 点赞
export const like = id => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: { target: id }
  })
}
