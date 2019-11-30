import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const RETURN_CODE_HANDLER = {
  '401': function(response) {
    MessageBox.alert('你已被登出，请重新登录', '提示', {
      confirmButtonText: '重新登录',
      showClose: false,
      type: 'warning'
    }).then(() => {
      removeToken()
      store.commit('user/SET_TOKEN', '')
      resetRouter()
      window.location.href = process.env.VUE_APP_BASE_URL + '/login'
    })
  },
  '403': function(response) {
    Message({
      message: response.message || '用户权限不足',
      type: 'error',
      duration: 5 * 1000
    })
  },
  '404': function(response) { },
  '500': function(response) {
    // Message({
    //   message: response.message || '服务器错误',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
  }
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token || getToken()) {
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const authorization = response.headers['authorization']
    if (authorization) {
      store.commit('user/SET_TOKEN', authorization)
      setToken(authorization)
    }
    return response.data
  },
  error => {
    const handler = RETURN_CODE_HANDLER[error.response.status]
    if (handler) {
      handler(error.response.data)
      return Promise.reject(error.response.data)
    }
    if (error.response.status > 500) {
      Message({
        message: error.response.message || '服务器错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
