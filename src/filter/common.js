// 过滤器
// 导入  dayjs
import dayjs from 'dayjs'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
import moment from 'moment'

// 导入语言包
import 'dayjs/locale/zh-cn'
// 使用插件
dayjs.extend(relativeTime)
// 使用语言包
dayjs.locale('zh-cn')

// 时间格式化
export const formatTime = v => {
  return dayjs().from(dayjs(v))
}

// 图片路径
export const imgPath = v => {
  return process.env.VUE_APP_URL + v
}

// 高亮处理
export const highLight = (s, v, color = 'red') => {
  return s.split(v).join('<span style="color:' + color + ';">' + v + '</span>')
}

// 时间格式化
export const timeFormat = v => {
  const diff = moment().diff(moment(v), 'h')
  if (diff < 1) {
    return '刚刚'
  } else if (diff < 24) {
    return diff + ' 小时前'
  } else if (diff < 720) {
    return Math.floor(diff / 24) + ' 天前'
  } else if (diff < 8760) {
    return Math.floor(diff / 720) + ' 个月前'
  } else {
    return Math.floor(diff / 8760) + ' 年前'
  }
}
