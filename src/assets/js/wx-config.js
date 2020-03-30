import wx from 'weixin-js-sdk'
import { getQueryString, loadScript } from 'assets/js/util'
import VConsole from 'vconsole'
import { PROJECT_CONFIG, PROJECT_CONFIG_CODE, WXCONFIG_SCRIPT_URL, SHARECONFIG, AUTH_URL } from 'api/config'
import { getProjectConfig, getWxConfig, getUserInfos } from 'api/api'

//获取微信配置参数信息
var re_request_num = 0;
(function _configStart() {
  if (PROJECT_CONFIG.wx_jssdk_type) {
    getWxConfig().then(res => {
      console.log("【获取微信注册参数信息】", res)
      _getPageConfig(res.data)
    }).catch(err => {
      console.log("【微信注册信息4个参数获取失败】", err)
      if ( re_request_num < 10) {
        re_request_num++
        _configStart()
      }
    }) 
  } else {
    loadScript(WXCONFIG_SCRIPT_URL, () => { _getPageConfig(window['wx_config']) })
  }
})()
//获取页面配置信息
function _getPageConfig(config) {
  if (!PROJECT_CONFIG_CODE) {
    _wxConfig(config)
  } else {
    getProjectConfig().then(res => {
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
      console.log("【获取核弹配置信息】", _data)
      sessionStorage.setItem("music", _data.res_music)
      document.title = _data.docTitle
      SHARECONFIG.Title = _data.shareTitle
      SHARECONFIG.Desc = _data.shareContent
      SHARECONFIG.ShareUrl = AUTH_URL || _data.project_url
      SHARECONFIG.ShareImage = _data.shareImg 
      _openDebugging(_data['online-date'], _data['offline-date'])
      _wxConfig(config)
      if (PROJECT_CONFIG.is_tx_mtah5) _mtaInit(_data.res_appid)
    }).catch(err => {
      console.log(err)
      _wxConfig(config)
    })
  }
}
//开启绿标配置
function _openDebugging(onlineDate, offlinedate) {
  let _is_go_online = true
  let _curTime = new Date().getTime()
  let _onlineDate = new Date(onlineDate.replace(/-/g, '/')).getTime()
  let _offlinedate = new Date(offlinedate.replace(/-/g, '/')).getTime()
  //development
  if (onlineDate && (_curTime - _onlineDate > 0) && (offlinedate && (_curTime - _offlinedate < 0))) _is_go_online = false
  if ( PROJECT_CONFIG.is_offline_sign_out && process.env.NODE_ENV == 'development' && _curTime - _offlinedate > 0) {
    alert("项目已下线")
    window.close()
  }
  if (PROJECT_CONFIG.vConsole.is_open == 1 || (PROJECT_CONFIG.vConsole.is_open == 2 && process.env.NODE_ENV == 'production') || (PROJECT_CONFIG.vConsole.is_open == 3 && process.env.NODE_ENV == 'production' && _is_go_online)) {
    let vConsole = new VConsole()
    document.querySelector(".vc-switch").innerHTML = PROJECT_CONFIG.vConsole.green_label_title
    document.querySelector(".vc-switch").style.background = PROJECT_CONFIG.vConsole.green_label_color
    document.querySelector(".vc-switch").style.bottom = PROJECT_CONFIG.vConsole.green_label_position
  }
  if (PROJECT_CONFIG.getUserInfo.is_open) getUserInfos()
}
//从本地缓存、url或者接口请求获取后台授权传过来的用户信息
const getUserInfo = () => {
  // if (PROJECT_CONFIG.getUserInfo.type !== 1 && PROJECT_CONFIG.getUserInfo.type !== 2) return
  return new Promise((resolve, reject) => {
    let _userInfo = {}
    if (PROJECT_CONFIG.getUserInfo.type === 1) {
      for (let item of PROJECT_CONFIG.getUserInfo.get_data_list) {
        let _item = getQueryString(item) || sessionStorage.getItem(item) || localStorage.getItem(item)
        if (_item) _userInfo[item] = _item
      }
      setStorage()
    } else if (PROJECT_CONFIG.getUserInfo.type === 2) {
      getUserInfos().then(res => {
        let _responseList = PROJECT_CONFIG.getUserInfo.response.split("."), index = 0
        _response()
        function _response() {
          index === 0 ? _userInfo = res[_responseList[++index]] : _userInfo = _userInfo[_responseList[++index]]
          if (index < _responseList.length - 1) _response()
        }
        setStorage()
      }).catch(err => { 
        console.log("【获取用户信息失败】", err)
        reject(err)
      })
    }
    function setStorage() {
      sessionStorage.setItem("userInfo", JSON.stringify(_userInfo))
      localStorage.setItem("userInfo", JSON.stringify(_userInfo))
      console.log("【sessionStorage】中的用户信息", sessionStorage.getItem("userInfo"))
      console.log("【localStorage】中的用户信息", localStorage.getItem("userInfo"))
      resolve(_userInfo)
    }
  })
}
//腾讯统计配置
function _mtaInit(sid) {
  let _mtac = {"performanceMonitor":1,"senseQuery":1}
  let mta = document.createElement("script")
  mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4"
  mta.setAttribute("name", "MTAH5")
  mta.setAttribute("sid", parseInt(sid))
  mta.setAttribute("cid", parseInt(sid) + 1)
  let s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore(mta, s)
}
//微信jssdk注册配置
function _wxConfig(config) {
  try{
    console.log("【微信jssdk注册配置参数】", config)
  }
  catch(err){
    console.log("【微信jssdk注册配置失败】", err)
    return
  }
  wx.config({
    // debug: window.openJssdkDebug,
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    jsApiList: [
    'checkJsApi', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice','onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'getLocalImgData', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
    ]
  })
  wx.ready(function () {
    checkJsApi(["chooseWXPay"]).then(res => { console.log("【检测是否支持某些功能】", res) })
    console.log("【wx.ready OK】")  
    if (PROJECT_CONFIG.is_wx_share) shareConfigure().then(res => { console.log("【分享配置成功】", res) }).catch(err => { console.log("【分享配置失败】", err) })
  })
  wx.error(function (res) {
    console.log("wx.config error:", res);
    _wxConfig();
  })
}
//微信、QQ分享配置
const shareConfigure = (shareConfig) => {
  return new Promise((resolve, reject) => {
    let isShareConfigure = 0, shareMessage = []
    if (shareConfig && typeof shareConfig == 'object') Object.assign(SHARECONFIG, shareConfig)
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({ 
      title: SHARECONFIG.Title, // 分享标题
      desc: SHARECONFIG.Desc, // 分享描述
      link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: SHARECONFIG.ShareImage, // 分享图标
      success: res => { // 分享配置成功回调
        isShareConfigure++
        shareMessage.push(res)
        if (isShareConfigure == 2) resolve(shareMessage) 
      },
      fail: err => {reject(err)}// 分享配置失败回调
    })
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: SHARECONFIG.Title,
      link: SHARECONFIG.ShareUrl,
      imgUrl: SHARECONFIG.ShareImage, 
      success: res => { // 分享配置成功回调
        isShareConfigure++
        shareMessage.push(res)
        if (isShareConfigure == 2) resolve(shareMessage) 
      },
      fail: err => {reject(err)}
    })
  })
}
//判断当前客户端版本是否支持指定JS接口
function checkJsApi(jsApiList) {
  return new Promise((resolve, reject) => {
    wx.checkJsApi({
      jsApiList: jsApiList,
      success: res => { resolve(res) },
      fail: err => {reject(err)}
    })
  })
}
export {
  shareConfigure,
  getUserInfo
}