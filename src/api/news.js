/* 新闻接口 */
import request from '@/utils/request'
// 频道新闻推荐_V1.1
// channel_id	是		频道ID
// timestamp	是	时间戳整数 单位毫秒	时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
// with_top	是	0或1	是否包含置顶，进入页面第一次请求时要包含置顶文章，1 - 包含置顶，0 - 不包含
export const appArticles = ({ channel_id, with_top }) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id,
      with_top,
      timestamp: (new Date()).getTime()
    },
    unNeedToken: true
  })
}
