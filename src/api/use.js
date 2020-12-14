// 封装所有与用户相关的网络请求
// 导入 request
import myhttp from '../utils/request.js'

// 封装一个登录的方法：
export function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    },
    needToken: false // 在这里定义的属性，在请求拦截器中的 config 中可以直接得到
  })
}

// 封装一个方法：得到用户信息
export function apiGetUserInfo () {
  return myhttp({
    url: '/app/v1_0/user',
    method: 'GET',
    // 添加一个标识:判断接口是否需要 token
    needToken: true
  })
}

// 封装方法：关注用户
export function apiFollow (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    needToken: true,
    data: {
      target: autid
    }
  })
}

// 封装方法：取关用户
export function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE',
    needToken: true
  })
}

// 封装方法：得到用户的信息
export function apiGetUser () {
  return myhttp({
    url: '/app/v1_0/user',
    method: 'GET',
    needToken: true
  })
}

// 封装方法：得到用户的个人资料
export function apiGetProfile () {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'GET',
    needToken: true
  })
}

// 封装方法：提交修改之后的数据
export function apiUpdate ({ name, gender, birthday, intro }) {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    needToken: true,
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}

// 封装方法：修改用户头像
export function apiUpdateImg (photo) {
  // axios & $ajax 都是异步请求，本质都是 XHR 发送请求到服务器
  // 而 XHR 有个特点：不能进行异步上传
  //   如果一定要进行异步上传提交参数时应该使用 formData
  // 将图片使用 formData 来进行传参
  // 创建一个 formDate 对象
  var fd = new FormData()
  // 添加数据
  fd.append('photo', photo)
  return myhttp({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd,
    needToken: true
  })
}
