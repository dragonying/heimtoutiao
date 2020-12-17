import axios from 'axios'
const URL = 'http://heima.backend.2dan88.com/tuling'

export default {
  chat: (userId, content) => {
    return axios.get(URL, {
      params: {
        user: userId,
        txt: content
      }
    })
  }
}
