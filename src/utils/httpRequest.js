import axios from 'axios'
import { getToken } from './auth'
import { Message, MessageBox } from 'element-ui'

const baseApi = 'admin'
const timeOut = 30 * 1000
const isDevelopment = process.env.NODE_ENV === 'development'
const msgDuration = 3 * 1000

// 创建axios实例
const service = axios.create({
  baseURL: baseApi,
  timeout: timeOut // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  if (isDevelopment) console.log(error) // for debug
  Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(
  // 对响应数据做点什么
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const data = response.data
    // if (isDevelopment) console.log(data)
    let code = data.code || -1
    if (code > 0 && code < 1000) {
      let msg = data.message || data.msg
      return Promise.reject(msg)
    }
    if (code >= 1000) {
      let msg = data.message || data.msg
      Message({message: msg, type: 'error', duration: msgDuration})
      return Promise.reject(msg)
    }
    return data
  },
  // 对响应错误做点什么
  error => {
    //console.log('响应异常: ' + error) // for debug
    //console.log(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 200:
          error.message = '请求错误'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错`
          if (isDevelopment) error.message += `: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
service.getUrl = (actionName) => {
  return baseApi + actionName
}

/**
 * 请求数据 post
 * @param url 请求的地址URL
 * @param params 请求参数
 * @returns {AxiosPromise}
 */
service.requestPost = (url, params) => {
  return service(url, {method: 'post', params: params})
}

export default service
