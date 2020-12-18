/** 消息类型  */
const MSG_TYPE_IMG = 1 // 图片
const MSG_TYPE_TXT = 2 // 文本
const MSG_TYPE_MONEY_SEND = 3 // 发送红包
export const MSG_TYPE = {
  MSG_TYPE_IMG: MSG_TYPE_IMG,
  MSG_TYPE_TXT: MSG_TYPE_TXT,
  MSG_TYPE_MONEY_SEND: MSG_TYPE_MONEY_SEND
}

// 接口状态值
const STATUS_OK = 200
const DATA_ERROR = 507
const PARAMS_ERROR = 400
const TOKEN_EXPIRE = 401
const UN_LOGIN = 403
const SERVER_ERROR = 500
export const SERVER_STATUS = {
  [STATUS_OK]: { title: '成功', value: STATUS_OK },
  [DATA_ERROR]: { title: '数据库错误', value: DATA_ERROR },
  [PARAMS_ERROR]: { title: '请求参数错误', value: PARAMS_ERROR },
  [TOKEN_EXPIRE]: { title: '登录已失效', value: TOKEN_EXPIRE },
  [UN_LOGIN]: { title: '未登录，请先登录', value: UN_LOGIN },
  [SERVER_ERROR]: { title: '服务器错误', value: SERVER_ERROR }
}

// 收藏/历史/粉丝/关注
const COLLECTION = 'collection' // 收藏
const HISTORY = 'history' // 历史
const CARE = 0 // 关注
const FANS = 1 // 粉丝
export const USER_COLUMN_TYPE = {
  COLLECTION,
  HISTORY,
  CARE,
  FANS
}
