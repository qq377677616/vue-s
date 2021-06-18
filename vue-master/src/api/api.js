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
  //对联测试
  getDuilian: (data, url = 'https://read.yangtse.com/home/hbtest/couplets2a', method = 'get') => { return api(url, data, method, true, 0) },
  //上传多段录制音频 
  uploadAudio: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_3/public/index/demo/message', method = 'post') => { return api(url, data, method, true, 0) },
  //微信支付
  payment: (data, url = 'https://game.vrupup.com/sanguo/wenjianhua/h5/xydszbsc/public/api/order/goods_place_order', method = 'post') => { return api(url, data, method, true, 0) },
  //抓取接口
  getGrab: (data, url = 'https://www.taptap.com/app/194610', method = 'jsonp') => { return api(url, data, method, true, 0) },
  //上传图片
  uploadImg: (data, url = '', method = 'post', config) => { return api(url, data, method, false, 0, config) }, 
  //获取cos临时密钥
  getCredentials: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Add/sign2', method = 'get') => { return api(url, data, method, true, 0) },
  //视频转码
  videoTransCoding: (data, url = 'https://mps.tencentcloudapi.com/', method = 'get') => { return api(url, data, method, false, 0) },
  //转码
  transcoding: (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/shj_sing/public/api/Upload/video', method = 'post') => { return api(url, data, method, true, 0) },
  //测试接口
  getTest: (data, url = 'http://game.vrupup.com/sanguo/wx38da89ddf8b76665/sye_lizhiyuan/public/api.php/index/getGoods', method = 'post') => { return api(url, data, method, true, 0) },
  //查找公司名
  getCompanyName: (data, url = 'https://sp0.tianyancha.com/search/suggestV2.json', method = 'get') => { return api(url, data, method, true, 0) },
  //PC端获取用户信息
  getAccessToken: (data, url = 'https://api.weixin.qq.com/sns/oauth2/access_token', method = 'get') => { return api(url, data, method, true, 0) },
  getUserInfo: (data, url = 'https://api.weixin.qq.com/sns/userinfo', method = 'get') => { return api(url, data, method, true, 0) },
  //德美接口
  getLiveList: (data, url = 'https://game.vrupup.com/sanguo/suyuanen/h5/demei/public/api/Live/live_list', method = 'get') => { return api(url, data, method, true, 0) },
  //获取其它接口
  getProjectConfig: (data, url = `https://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web`, method = 'get') => { return api(url, data, method, true, 0) },
  //测试接口
  getPostTest: (data, url = 'http://auth.vrupup.com/sanguo/auth/share.php?appid=wx7c3ed56f7f792d84&type=js', method = 'get') => { return api(url, data, method, true, 0) },
  getPhpUserInfo: (data, url = 'https://game.vrupup.com/sanguo/songyu/h5/web_test/api.php?a=get_user_info', method = 'get') => { return api(url, data, method, true, 0) },
  getVideo: (data, url = 'https://api.elloworld.cn/sanyuan/api/index/rendervideo', method = 'post') => { return api(url, data, method, false, 0) },
  getPosition: (data, url = 'https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=1', method = 'jsonp') => { return api(url, data, method, true, 0) },
  getPosition: (data, url = 'https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=1', method = 'jsonp') => { return api(url, data, method, true, 0) },
  setPoint: (data, url = 'https://game.vrupup.com/sanguo/suyuanen/h5/demei/public/api/Live/live_list', method = 'post') => { return api(url, data, method, true, 0) },
  // 获取秘钥
  getKeyApi: (data, url = 'https://code.haoqithink.com/kcss/public/index.php/api/question/get_key', method = 'post') => { return api(url, data, method, true, 0) },
}