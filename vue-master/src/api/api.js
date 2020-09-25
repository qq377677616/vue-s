import { api } from 'api/request.js' 
/*********************项目接口请求列表(接口地址, 传参, 请求类型[get, post, jsonp], 是否qs参数, 接口地址形式[0为全链接，1为半链接，2为代理链接])*********************/
/**
 下面为项目接口请求 
 * return api(url, data, type, true, 1 )四个参数说明：
 * 请求地址、传参、post/get、是否qs、0为全地址/1为线上请求地址/2为本地代理地址 
 */ 
//上传多段录制音频
const uploadAudio = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_3/public/index/demo/message', type = 'post') => { return api(url, data, type, true, 0) }
const getTeam = (data, url = 'http://cbg2020.cfpa.org.cn/backend/public/api/team/team_rand?openid=oJQbqt6fn9B6AHIGWPjK9ws26Am8', type = 'post') => { return api(url, data, type, true, 0) }
//测试接口
const getPostTest = (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1) }
//上传图片
const uploadImg = (data, url = '', type = 'post', config) => { return api(url, data, type, false, 0, config) }
//获取cos临时密钥
const getCredentials = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Add/sign2', type = 'get') => { return api(url, data, type, true, 0) }
//视频转码
const videoTransCoding = (data, url = 'https://mps.tencentcloudapi.com/', type = 'get') => { return api(url, data, type, false, 0) }
//转码
const transcoding = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Upload/video', type = 'post') => { return api(url, data, type, true, 0) }
//测试接口
const getTest = (data, url = 'http://game.vrupup.com/sanguo/wx38da89ddf8b76665/sye_lizhiyuan/public/api.php/index/getGoods', type = 'post') => { return api(url, data, type, true, 0) }
//查找公司名
const getCompanyName = (data, url = 'https://sp0.tianyancha.com/search/suggestV2.json', type = 'get') => { return api(url, data, type, true, 0) }

export {
  uploadAudio,
  getTeam,
  getPostTest,
  uploadImg,
  getCredentials,
  videoTransCoding,
  transcoding,
  getTest,
  getCompanyName
}