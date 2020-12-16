/** 用户相关接口 */

import request from '@/utils/request'

// 编辑用户个人资料（包含实名认证）
//  name string 非必须 昵称
//  photo string 非必须 头像 base64编码处理
//  gender integer 非必须 性别，0-男，1-女
//  birthday string 非必须 生日，格式'2018-12-20'
//  real_name string 非必须 真实姓名
//  id_number string 非必须 身份证号
//  id_card_front string 非必须 身份证正面照片 base64编码处理
//  id_card_back string 非必须 身份证背面照片 base64编码处理
//  id_card_handheld string 非必须 手持身份证照片 base64编码处理
//  intro string 非必须 个人介绍
export const profile = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: data
  })
}

// 修改 或删除 指定用户频道
// target 频道id
export const channels = (target, isDelete = false) => {
  return request({
    url: ' /app/v1_0/user/channels/' + target,
    method: isDelete ? 'DELETE' : 'PUT'
  })
}

// 刷新用户token
export const freshAuthorizations = () => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'PUT'
  })
}

// 取消关注用户 和 关注用户
export const followings = (target, isDelete = false) => {
  const option = {
    url: '/app/v1_0/user/followings',
    method: isDelete ? 'DELETE' : 'POST'
  }
  isDelete ? (option.url += `/${target}`) : (option.data = { target })
  return request(option)
}

// 取消拉黑用户
export const blacklists = target => {
  return request({
    url: ' /app/v1_0/user/blacklists/' + target,
    method: 'DELETE'
  })
}

// 批量修改用户频道列表（PATCH 部分覆盖 PUT 重置方式）
// channels object [] 必须 用户关注的频道列表
// item 类型: object
// ├─ id integer 必须 频道id
// ├─ seq integer 必须 顺序序号
export const allChannels = (data, isReset = false) => {
  return request({
    url: ' /app/v1_0/user/channels',
    method: isReset ? 'PUT' : 'PATCH',
    data: data
  })
}

// 批量删除用户频道列表
// channels integer [] 必须 用户关注的频道列表  item 类型: integer
export const delChannels = channels => {
  return request({
    url: ' /app/v1_0/user/channels',
    method: 'DELETE',
    data: { channels: channels }
  })
}

// 用户认证（登录注册）
// mobile string 必须 手机号
// code string 必须 短信验证码
export const authorizations = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: data,
    unNeedToken: true
  })
}

// 编辑用户照片资料（头像、身份证照片）
// photo file 否 头像
// id_card_front file 否 身份证正面照片
// id_card_back file 否 身份证背面照片
// id_card_handheld file 否 手持身份证照片
export const photo = data => {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: data
  })
}

// 获取指定用户信息
// target 目标用户id
export const usersInfo = target => {
  return request({
    url: '/app/v1_0/users/' + target,
    method: 'GET'
  })
}

// 获取用户个人资料
// target integer 必须 关注目标
export const usersDetail = target => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET',
    params: { target: target }
  })
}

// 获取用户的关注列表
// page 否 页数
// per_page 否 每页数量
export const userFollowings = params => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'GET',
    params: params
  })
}
// 获取用户的粉丝列表
// page 否 页数
// per_page 否 每页数量
export const userFans = params => {
  return request({
    url: '/app/v1_0/user/followers',
    method: 'GET',
    params: params
  })
}

// 获取用户的统计数据
export const userFigure = () => {
  return request({
    url: '/app/v1_0/user/figure',
    method: 'GET'
  })
}

// 获取用户自己信息
export const userSelfInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 获取用户频道列表
export const userChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

// 获取短信验证码
export const mobileCode = mobile => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile,
    method: 'GET',
    unNeedToken: true
  })
}

// 设置用户频道列表（增量式）
// channels object [] 必须 用户关注的频道列表
// item 类型: object
// ├─ id integer 必须 频道id
// ├─ seq integer 必须 顺序序号
export const setChannels = data => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'POST',
    data: data
  })
}
