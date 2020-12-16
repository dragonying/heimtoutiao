import request from '@/utils/request'

// 默认需要token
export const codes = par => {
  return request({
    url: ' /app/v1_0/sms/codes/:mobile',
    method: 'GET',
    params: par
  })
}
