import { api } from 'api/request.js' 
/** 
 下面为项目接口请求  
 * return api(url, data, type, true, 1 )四个参数说明：
 * 请求地址、传参、post/get/jsonp、是否qs、0为全地址/1为半地址/2为本地代理地址 
 */ 
export default {
  //对联测试
  getDuilian: (data, url = 'https://read.yangtse.com/home/hbtest/couplets2a', type = 'get') => { return api(url, data, type, true, 0) },
  //上传多段录制音频 
  uploadAudio: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_3/public/index/demo/message', type = 'post') => { return api(url, data, type, true, 0) },
  //抓取接口
  getGrab: (data, url = 'https://www.taptap.com/app/194610', type = 'jsonp') => { return api(url, data, type, true, 0) },
  //上传图片
  uploadImg: (data, url = '', type = 'post', config) => { return api(url, data, type, false, 0, config) }, 
  //获取cos临时密钥
  getCredentials: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Add/sign2', type = 'get') => { return api(url, data, type, true, 0) },
  //视频转码
  videoTransCoding: (data, url = 'https://mps.tencentcloudapi.com/', type = 'get') => { return api(url, data, type, false, 0) },
  //转码
  transcoding: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Upload/video', type = 'post') => { return api(url, data, type, true, 0) },
  //测试接口
  getTest: (data, url = 'http://game.vrupup.com/sanguo/wx38da89ddf8b76665/sye_lizhiyuan/public/api.php/index/getGoods', type = 'post') => { return api(url, data, type, true, 0) },
  //查找公司名
  getCompanyName: (data, url = 'https://sp0.tianyancha.com/search/suggestV2.json', type = 'get') => { return api(url, data, type, true, 0) },
  //PC端获取用户信息
  getAccessToken: (data, url = 'https://api.weixin.qq.com/sns/oauth2/access_token', type = 'get') => { return api(url, data, type, true, 0) },
  getUserInfo: (data, url = 'https://api.weixin.qq.com/sns/userinfo', type = 'get') => { return api(url, data, type, true, 0) },
  //德美接口
  getLiveList: (data, url = 'https://game.vrupup.com/sanguo/suyuanen/h5/demei/public/api/Live/live_list', type = 'get') => { return api(url, data, type, true, 0) },
  //获取其它接口
  getProjectConfig: (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web`, type = 'get') => { return api(url, data, type, true, 0) },
  //测试接口
  getPostTest: (data, url = 'http://auth.vrupup.com/sanguo/auth/share.php?appid=wx7c3ed56f7f792d84&type=js', type = 'get') => { return api(url, data, type, true, 0) },
  getVideo: (data, url = 'https://api.elloworld.cn/sanyuan/api/index/rendervideo', type = 'post') => { return api(url, data, type, false, 0) },
  getPosition: (data, url = 'https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=1', type = 'jsonp') => { return api(url, data, type, true, 0) }
}