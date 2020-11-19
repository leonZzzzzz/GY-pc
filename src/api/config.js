import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import { BASEURL, PHPURL } from '@/utils/config'

axios.defaults.timeout = 60000 //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //配置请求头

axios.interceptors.request.use(
  config => {
    const url = config.url
    if (url.indexOf('api/') === -1 && url !== 'login' && url !== 'logout') {
      config.url = PHPURL + '/' + config.url
      config.headers['php-cookie'] = 'SESSION=' + JSON.parse(localStorage.getItem('user')).SESSION
    } else {
      config.url = BASEURL + '/' + config.url
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.data.code == 20000 || res.data.code == 50104) {
      return res
    } else if (res.data.code == 50103) {
      store.commit('updateSession', true)
      return Promise.reject(res)
    } else {
      Message.error(res.data.message)
      return Promise.reject(res)
    }
  },
  function axiosRetryInterceptor(err) {
    Message.error('请求错误')
    return Promise.reject(err)
  }
)

export default {
  get(url, params) {
    return axios.get(url, { params })
  },
  post(url, params) {
    return axios.post(url, qs.stringify(params))
  },
  json(url, params) {
    return axios.post(url, params)
  },
  upload(url, params) {
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }
}
