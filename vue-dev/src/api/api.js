import { api } from 'api/request.js' 
/**
 下面为项目接口请求  
 * return api(url, data, type, true, 1 )四个参数说明：
 * 请求地址、传参、post/get/jsonp、是否qs、0为全地址/1为半地址/2为本地代理地址 
 */ 
export default {
  //测试接口
  getPostTest: (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1) },
}