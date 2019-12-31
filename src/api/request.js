import axios from 'axios'
import qs from 'qs'
import jsonp from 'api/jsonp'
import { WXCONFIG_URL, PROJECT_CONFIG_URL, ERR_Ok } from 'api/config'

let REQUESTURL = '/api' //跨域请求代理默认url

/*********************创建一个axios实例*********************/
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['X-Access-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjcsIm5vdyI6MTU3NzY4NDU4Mjg4OSwic3RycyI6WyJjb21wYW55X3Njb3BlIiwiZ2w4c2wiXSwidHlwZSI6MiwidXUiOiIxN2NiMWZmOC0wZWQyLTQ0MTEtODA1YS0xMTMyNzU2NGY4OTYifQ.aJfiTZoPrpzUJKfRbnJ_d7nN-iZbLQmv7iK7j0KMNm4'

/*********************当前模式*********************/
if (process.env.NODE_ENV == 'development') {//本地开发模式
  console.log("【本地开发模式】")
} else {//线上部署模式
  console.log("【线上部署模式】")
  // REQUESTURL = 'https://dev.flyh5.cn/yokelly-shop/v1/admin/label'
  REQUESTURL = 'https://api.topsales.net.cn/open'
}

/*********************请求拦截器*********************/
axios.interceptors.request.use(
  config => {
    // console.log("【请求拦截器】", config)
    // config.headers.token = 'my-token'
    // config.headers["x-access-token"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjcsIm5vdyI6MTU3NzY4NDU4Mjg4OSwic3RycyI6WyJjb21wYW55X3Njb3BlIiwiZ2w4c2wiXSwidHlwZSI6MiwidXUiOiIxN2NiMWZmOC0wZWQyLTQ0MTEtODA1YS0xMTMyNzU2NGY4OTYifQ.aJfiTZoPrpzUJKfRbnJ_d7nN-iZbLQmv7iK7j0KMNm4';
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/*********************响应拦截器*********************/
axios.interceptors.response.use(response => {
  // console.log("【响应拦截器】", response)
  if (response.status == ERR_Ok || response.data.status == ERR_Ok || response.data.data.status == ERR_Ok) {
    return response
  } else {
    return { status: 1001, message: `返回数据状态status字段不为${ERR_Ok}` }
  }
})

/*********************接口请求*********************/
//获取微信config配置信息
export function getWxConfig() {
  return axios.post(WXCONFIG_URL).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//核弹系统配置
export function getProjectConfig() {
  return axios.post(PROJECT_CONFIG_URL).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//获取当前位置信息
export function getIpLocation() {
  let url = `https://apis.map.qq.com/ws/location/v1/ip?key=GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ` 
  return jsonp(url, { callbackName: 'QQmap', output:'jsonp' }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//测试接口
export function getPostTest(data) {
  let url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_snowflower/public/index.php/index/index/bis_detail'
  return axios.post(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
//测试接口
export function getTest(data) {
  let url = `${REQUESTURL}/user/ce507050294a4e65993c4bc8225603d3`
  return axios.get(url, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })      
}
// export function getTest(data) {
//   let url = 'https://api.topsales.net.cn/open/user/ce507050294a4e65993c4bc8225603d3'
//   return jsonp(url, data).then((res) => {
//     return Promise.resolve(res)
//   }).catch((err) => {
//     return Promise.reject(err)
//   })      
// }
