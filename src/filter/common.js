// 过滤器
// 导入  dayjs
import dayjs from 'dayjs'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
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
export const highLight = (s, v) => {
  return s.split(v).join('<span style="color:red;">' + v + '</span>')
}

// 语言包
