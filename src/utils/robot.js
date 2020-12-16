import axios from 'axios'
// import md5 from 'js-md5'
// const URL = 'http://openapi.tuling123.com/openapi/api/v2'
// const APIKEY = '951d64a7211b4e778833048f00b0336b'

export default {
  chat: (userId, content) => {
    return axios.get('https://autumnfish.cn/api/joke/list?num=1')
    // return axios.post(URL, {
    //   reqType: 0,
    //   perception: {
    //     inputText: {
    //       text: content
    //     }
    //   },
    //   userInfo: {
    //     apiKey: APIKEY,
    //     userId: md5(userId)
    //   }
    // })
    // console.log(res)
  }
}
