// 负责封装项目中所有的过滤器
import Vue from 'vue'
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

// 定义过滤器
Vue.filter('fromtime', function (value) {
  return dayjs().from(dayjs(value))
})
