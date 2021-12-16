import axios from 'axios'
import {
  ElMessageBox
} from 'element-plus'

// axios.defaults.baseURL = 'http://localhost:8089' // 测试

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 设置超时
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    ElMessageBox(error)
  }
)
export default {
  post (url: string, data: JSON):Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  get (url: string, data: JSON) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
