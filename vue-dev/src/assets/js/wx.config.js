import wx from 'weixin-js-sdk'
import { getQueryString, getBrowserEnvironment, loadScript } from 'assets/js/util'
import VConsole from 'vconsole'
import { PROJECT_CONFIG, PROJECT_CONFIG_CODE, WXCONFIG_SCRIPT_URL, SHARECONFIG, AUTH_URL } from 'api/project.config'
import { getProjectConfig, getWxConfig, getUserInfos, setDataShare, setDataDuration } from 'api/api.config'

//获取微信配置参数信息
let re_request_num = 0, NUM_RETRIES = 0;
(function _configStart() {
  if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE) setLookPageTime()
  if (PROJECT_CONFIG.wx_jssdk_type) {
    getWxConfig({ url: encodeURIComponent(window.location.href) }).then(res => {
      console.log("【微信注册信息4个参数获取成功】", res)
      _getPageConfig(PROJECT_CONFIG.wx_jssdk_field == 2 ? res.data.result : res.data)
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
//页面访问时长统计
function setLookPageTime() {
  let total_times = 0
  setInterval(() => {
    ++total_times
  }, 1000)
  window.onload = function() {
    if (localStorage.getItem("total_times")) {
      setDataDuration({ second: localStorage.getItem("total_times") }).then(res => { console.log(`【数据统计--访问时长--${total_times}s】`) })
    }
  }
  window.onbeforeunload = function() {
    localStorage.setItem("total_times", total_times)
  }
}
//获取页面配置信息
function _getPageConfig(config) {
  if (!PROJECT_CONFIG_CODE) {
    _wxConfig(config)
    _openDebugging()
  } else {
    getProjectConfig().then(res => {
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
      console.log("【获取核弹配置信息成功】", _data)
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
      console.log("【获取核弹配置信息失败】", err)
      _wxConfig(config)
    })
  }
}
//开启绿标配置
function _openDebugging(onlineDate, offlinedate) {
  let _is_go_online = true
  if (onlineDate && offlinedate) {
    let _curTime = new Date().getTime()
    let _onlineDate = new Date(onlineDate.replace(/-/g, '/')).getTime()
    let _offlinedate = new Date(offlinedate.replace(/-/g, '/')).getTime()
    //development
    if (onlineDate && (_curTime - _onlineDate > 0) && (offlinedate && (_curTime - _offlinedate < 0))) _is_go_online = false
    if ( PROJECT_CONFIG.is_offline_sign_out && process.env.NODE_ENV == 'development' && _curTime - _offlinedate > 0) {
      alert("项目已下线")
      window.close()
    }
  }
  if (PROJECT_CONFIG.vConsole.is_open == 1 || (PROJECT_CONFIG.vConsole.is_open == 2 && (process.env.NODE_ENV == 'production' || window.location.href.indexOf("192.") != -1)) || (PROJECT_CONFIG.vConsole.is_open == 3 && process.env.NODE_ENV == 'production' && _is_go_online)) {
    let vConsole = new VConsole()
    document.querySelector(".vc-switch").innerHTML = PROJECT_CONFIG.vConsole.green_label_title
    document.querySelector(".vc-switch").style.background = PROJECT_CONFIG.vConsole.green_label_color
    PROJECT_CONFIG.vConsole.green_label_position && (document.querySelector(".vc-switch").style.bottom = PROJECT_CONFIG.vConsole.green_label_position)
  }
  if (PROJECT_CONFIG.getUserInfo.is_open) getUserInfo()
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
      if (JSON.stringify(_userInfo) == "{}") return
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
    console.log("【获取最终微信jssdk注册参数】", config)
  }
  catch(err){
    console.log("【获取最终微信jssdk注册参数异常】", err)
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
  wx.ready(() => {
    checkJsApi(["chooseWXPay"]).then(res => {
      console.log("【检测是否支持某些功能】", res, res.checkResult.chooseWXPay)
      if (res.checkResult.chooseWXPay) {
        console.log("【wx.ready OK】")
        hideMenuItems()
        if (PROJECT_CONFIG.is_wx_share) shareConfigure().then(res => {
          console.log("【分享配置成功】", res)
          window.isShareOk = true
        }).catch(err => {
          console.log("【分享配置失败】", err)
          // window.location.reload()
          return;
        })
      }
    })
  })
  wx.error(res => {
    console.log("wx.config error:", res);
    if ( NUM_RETRIES < 10) {
      NUM_RETRIES++
      _wxConfig(config)
    }
  })
}
//批量隐藏功能按钮(传播类和保护类)
function hideMenuItems() {
  let { hideMenuList } = SHARECONFIG, menuList = []
  let hideMenuListAll = ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:copyUrl", "menuItem:favorite", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"]
  Object.keys(hideMenuList).forEach((item, index) => {
    if (hideMenuList[item]) menuList.push(hideMenuListAll[index])
  })
  if (menuList.length == 0) return
  wx.hideMenuItems({
    menuList: menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  })
// 传播类
// 发送给朋友: "menuItem:share:appMessage"
// 分享到朋友圈: "menuItem:share:timeline"
// 分享到QQ: "menuItem:share:qq"
// 收藏: "menuItem:favorite"
// 分享到 QQ 空间 "menuItem:share:QZone"
// 复制链接: "menuItem:copyUrl"
// 在QQ浏览器中打开: "menuItem:openWithQQBrowser"
// 在Safari中打开: "menuItem:openWithSafari"
}
//微信、QQ分享配置
const shareConfigure = shareConfig => {
  return new Promise((resolve, reject) => {
    let isShareConfigure = 0, shareMessage = []
    if (shareConfig && typeof shareConfig == 'object') Object.assign(SHARECONFIG, shareConfig)
    if (SHARECONFIG.type) {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
      wx.updateAppMessageShareData({ 
        title: SHARECONFIG.Title, // 分享标题
        desc: SHARECONFIG.Desc, // 分享描述
        link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: SHARECONFIG.ShareImage, // 分享图标
        success: res => { // 分享配置成功回调
          shareMessage.push(res)
          isShareConfigure++
          if (isShareConfigure == 2) resolve(shareMessage) 
        },
        trigger:() => { alert('点击了分享') },
        fail: err => {reject(err)}// 分享配置失败回调
      })
      // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
      wx.updateTimelineShareData({
        title: SHARECONFIG.Title,
        link: SHARECONFIG.ShareUrl,
        imgUrl: SHARECONFIG.ShareImage, 
        success: res => { // 分享配置成功回调
          shareMessage.push(res)
          isShareConfigure++
          if (isShareConfigure == 2) resolve(shareMessage) 
        },
        trigger:() => { alert('点击了分享2') },
        fail: err => {reject(err)}
      })
    } else {
      //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareAppMessage({
        title: SHARECONFIG.Title,
        desc: SHARECONFIG.Desc,
        link: SHARECONFIG.ShareUrl,
        imgUrl: SHARECONFIG.ShareImage,
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success:() => { 
          SHARECONFIG.success({ type: 1, title: "点击了分享给好友的按钮" })
          if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE) setDataShare().then(res => { console.log("【数据统计--点击分享】") })
         },
        trigger:() => { console.log("分享给好友") }
      })
      //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareTimeline({
        title: SHARECONFIG.Title,
        link: SHARECONFIG.ShareUrl,
        imgUrl: SHARECONFIG.ShareImage,
        success:() => { 
          SHARECONFIG.success({ type: 2, title: "点击了分享到朋友圈的按钮" }) 
          if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE) setDataShare().then(res => { console.log("【数据统计--点击分享】") })
        },
        trigger:() => { console.log("分享到朋友圈") }
      })
      //获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareQQ({
        title: SHARECONFIG.Title,
        desc: SHARECONFIG.Desc,
        link: SHARECONFIG.ShareUrl,
        imgUrl: SHARECONFIG.ShareImage,
        success:() => { 
          SHARECONFIG.success({ type: 3, title: "点击了分享到QQ的按钮" }) 
          if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE) setDataShare().then(res => { console.log("【数据统计--点击分享】") })
        },
        trigger:() => { console.log("分享到QQ") }
      });
      //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareQZone({
        title: SHARECONFIG.Title,
        desc: SHARECONFIG.Desc,
        link: SHARECONFIG.ShareUrl,
        imgUrl: SHARECONFIG.ShareImage,
        success:() => { 
          SHARECONFIG.success({ type: 4, title: "点击了分享到QQ的按钮" }) 
          if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE) setDataShare().then(res => { console.log("【数据统计--点击分享】") })
        },
        trigger:() => { console.log("分享到QQ空间") }
      })
    }
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