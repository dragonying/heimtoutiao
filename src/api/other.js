// 用来封装其它的网络请求
import myhttp from '../utils/request'

// 封装方法：得到联想的数据
export function apiThink (key) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: key
    }
  })
}

// 封装方法：获取搜索结果
export function apiGetSearch ({ page, perpage, q }) {
  return myhttp({
    url: '/app/v1_0/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: q
    },
    needToken: true
  })
}
