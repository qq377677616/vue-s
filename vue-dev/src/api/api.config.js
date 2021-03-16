import { api } from 'api/request.js' 
import { WXCONFIG_URL, PROJECT_CONFIG, PROJECT_CONFIG_CODE, GET_USER_INFO_URL } from 'api/project.config'
/**
 * 接口请求
 * @param { String } url 接口地址 
 * @param { Object } data 请求的参数 
 * @param { String } method 请求方式（post/get/jsonp）
 * @param { String } url 接口地址 
 * @param { Boolean } 是否qs请求参数 
 * @param { Number } 接口地址类型（0为全地址、1为半地址、2为本地代理地址） 
 */
//获取微信jssdk注册配置信息
const getWxConfig = (data, url = `${WXCONFIG_URL[PROJECT_CONFIG.wx_jssdk_field]}&url=${encodeURIComponent(window.location.href)}`, type = 'get') => { return api(url, data, type, true, 0) }
//核弹系统配置
const getProjectConfig = (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=${PROJECT_CONFIG_CODE}`, type = 'post') => { return api(url, data, type, true, 0) }
//获取用户信息
const getUserInfos = (data, url = GET_USER_INFO_URL, type = 'post') => { return api(url, data, type, true, 0) }
/**
 * h5抵达、分享、时长数据统计三兄弟
 */ 
const setDataArrive = (data, url = "https://dev.flyh5.cn/looktable/api/data/arrive", type = 'post') => { return api(url, { ...data, ...{ code: PROJECT_CONFIG_CODE }}, type, true, 0) }//status ==> 0:没有抵达,1:抵达主KV,2:抵达结果页
const setDataShare = (data, url = "https://dev.flyh5.cn/looktable/api/data/share", type = 'post') => { return api(url, data = { code: PROJECT_CONFIG_CODE }, type, true, 0) }
const setDataDuration = (data, url = "https://dev.flyh5.cn/looktable/api/data/duration", type = 'post') => { return api(url, { ...data, ...{ code: PROJECT_CONFIG_CODE } }, type, true, 0) }//second ==> 停留秒数

export {
  getWxConfig,
  getProjectConfig, 
  getUserInfos,
  setDataArrive,
  setDataShare,
  setDataDuration
}