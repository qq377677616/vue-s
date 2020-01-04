import { api } from 'api/request.js'
import { WXCONFIG_URL, PROJECT_CONFIG_URL } from 'api/config'
/*********************项目接口请求列表*********************/
//获取微信config配置信息
const getWxConfig = (data, url = WXCONFIG_URL, type = 'post') => { return api(url, data, type, true, 0) }
//核弹系统配置
const getProjectConfig = (data, url = PROJECT_CONFIG_URL, type = 'post') => { return api(url, data, type, true, 0) }
//获取当前位置信息
const getIpLocation = (data, url = `https://apis.map.qq.com/ws/location/v1/ip?key=GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ`, type = 'jsonp') => { return api(url, data, type, true, 0) }
//测试接口
const getPostTest = (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1 ) }

export {
  getWxConfig,
  getProjectConfig,
  getIpLocation,
  getPostTest
}