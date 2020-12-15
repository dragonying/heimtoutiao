import request from '@/utils/request'

export const search = par => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: par
  })
}
