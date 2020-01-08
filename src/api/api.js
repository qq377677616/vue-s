import { api } from 'api/request.js' 
import { WXCONFIG_URL, PROJECT_CONFIG_URL } from 'api/config'
/*********************项目接口请求列表(接口地址, 传参, 请求类型[get, post, jsonp], 是否qs参数, 接口地址形式[0为全链接，1为半链接，2为代理链接])*********************/
//获取微信config配置信息
const getWxConfig = (data, url = WXCONFIG_URL, type = 'post') => { return api(url, data, type, true, 0) }
//核弹系统配置
const getProjectConfig = (data, url = PROJECT_CONFIG_URL, type = 'post') => { return api(url, data, type, true, 0) }

//上传多段录制音频
const uploadAudio = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_3/public/index/demo/message', type = 'post') => { return api(url, data, type, true, 0) }
//测试接口
const getPostTest = (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1 ) }

export {
  getWxConfig,
  getProjectConfig,
  uploadAudio,
  getPostTest
}