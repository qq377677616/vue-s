import { api } from 'api/request.js' 
import { WXCONFIG_URL, PROJECT_CONFIG, PROJECT_CONFIG_CODE, GET_USER_INFO_URL } from 'api/config'
/*********************项目接口请求列表(接口地址, 传参, 请求类型[get, post, jsonp], 是否qs参数, 接口地址形式[0为全链接，1为半链接，2为代理链接])*********************/
//获取微信config配置信息
const getWxConfig = (data, url = WXCONFIG_URL[PROJECT_CONFIG.wx_jssdk_field], type = 'post') => { return api(url, data, type, true, 0) }
//核弹系统配置
const getProjectConfig = (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=${PROJECT_CONFIG_CODE}`, type = 'post') => { return api(url, data, type, true, 0) }
//获取用户信息
const getUserInfos = (data, url = GET_USER_INFO_URL, type = 'post') => { return api(url, data, type, true, 0) }
/**
 下面为项目接口请求 
 * return api(url, data, type, true, 1 )四个参数说明：
 * 请求地址、传参、post/get、是否qs、0为全地址/1为线上请求地址/2为本地代理地址 
 */ 
//上传多段录制音频
const uploadAudio = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_3/public/index/demo/message', type = 'post') => { return api(url, data, type, true, 0) }
//测试接口
const getPostTest = (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1) }
//上传图片
const uploadImg = (data, url = '', type = 'post', config) => { return api(url, data, type, false, 0, config) }
//测试接口
const getTest = (data, url = 'http://game.vrupup.com/sanguo/wx38da89ddf8b76665/sye_lizhiyuan/public/api.php/index/getGoods', type = 'post') => { return api(url, data, type, true, 0) }

export {
  getWxConfig,
  getProjectConfig,
  getUserInfos,
  /*下面为项目接口请求*/
  uploadAudio,
  getPostTest,
  uploadImg,
  getTest
}