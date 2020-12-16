import request from '@/utils/request'

// 默认需要token
export const testA = par => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: par
  })
}

// 不需要token
export const testB = par => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: par,
    unNeedToken: true
  })
}
