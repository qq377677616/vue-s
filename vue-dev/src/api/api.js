import { api } from 'api/request' 
/**
 * 接口请求
 * @param { String } url 接口地址 
 * @param { Object } data 请求的参数 
 * @param { String } method 请求方式（post/get/jsonp）
 * @param { String } url 接口地址 
 * @param { Boolean } 是否qs请求参数 
 * @param { Number } 接口地址类型（0为全地址、1为半地址、2为本地代理地址） 
 */
export default {
  //测试接口
  // getPostTest: (data, url = 'https://game.api.dev.yongpu.cn/wxapp/auth', method = 'post') => { return api(url, data, method, true, 0) },
  getPostTest: (data, url = 'http://fantastic.beta.qunar.com/game/index', method = 'post') => { return api(url, data, method, true, 0) },
}