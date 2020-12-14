// 封装所有与频道相关的网络请求
import myhttp from '../utils/request'

// 封装一个得到频道的方法
export function apiGetChannelsList () {
  return myhttp({
    url: '/app/v1_0/user/channels',
    // 请求时携带 token
    needToken: true
  })
}

// 封装一个方法得到全部频道数据
export function apiGetAllChannel () {
  return myhttp({
    url: '/app/v1_0/channels',
    needToken: false
  })
}

// 封装方法： 批量修改频道数据
// mychannel: 修改之后的频道数据集合
//  [{id: '频道的 id' , seq: '频道的顺序' }, {id: '频道的 id' , seq: '频道的顺序' }]
//  seq: 从 1 开始
export function apiUpdateChannel (mychannel) {
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'PUT', // 当作用 post 来看就可以了
    needToken: true,
    data: {
      channels: mychannel
    }
  })
}
