import wx from 'weixin-js-sdk'
import { loadScript } from 'assets/js/util'
import VConsole from 'vconsole'
import { PROJECT_CONFIG, PROJECT_CONFIG_URL, WXCONFIG_SCRIPT_URL, SHARECONFIG, AUTH_URL } from 'api/config'
import { getProjectConfig, getWxConfig } from 'api/api.js'

//获取微信配置参数信息
var re_request_num = 0;
(function _configStart() {
  if (PROJECT_CONFIG.wx_jssdk_type) {
    getWxConfig().then(res => {
      console.log("【微信注册信息】", res)
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
  if (!PROJECT_CONFIG_URL) {
    _wxConfig(config)
  } else {
    getProjectConfig().then(res => {
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
      console.log("【获取页面配置信息】", _data)
      sessionStorage.setItem("music", _data.res_music)
      document.title = _data.docTitle
      SHARECONFIG.Title = _data.shareTitle
      SHARECONFIG.Desc = _data.shareContent
      SHARECONFIG.ShareUrl = AUTH_URL || _data.project_url
      SHARECONFIG.ShareImage = _data.shareImg 
      _openDebugging(_data['online-date'], _data['offline-date'])
      _wxConfig(config)
      _mtaInit(_data.res_appid)
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
  if (PROJECT_CONFIG.is_vconsole == 1 || (PROJECT_CONFIG.is_vconsole == 2 && process.env.NODE_ENV == 'production') || (PROJECT_CONFIG.is_vconsole == 3 && process.env.NODE_ENV == 'production' && _is_go_online)) {
    let vConsole = new VConsole()
  }
}
//腾讯统计配置
function _mtaInit(sid) {
  let _mtac = {"performanceMonitor":1,"senseQuery":1}
  let mta = document.createElement("script")
  mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4"
  mta.setAttribute("name", "MTAH5")
  mta.setAttribute("sid", sid)
  mta.setAttribute("cid", sid + 1)
  let s = document.getElementsByTagName("script")[0]
  s.parentNode.insertBefore(mta, s)
}
//微信jssdk注册配置
function _wxConfig(config) {
  // try{
  //   console.log("wx_config", wx_config)
  // }
  // catch(err){
  //   console.log(err)
  //   return
  // }
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
    // wx.checkJsApi({
    //     jsApiList: ["chooseWXPay"],
    //     success: function (res) {
    //       console.log('【是否支付chooseWXPay】', res)
    //         if (res.checkResult.chooseWXPay) {
    //             console.log("wx.checkJsApi success");
    //             window.wxConfigReady = true;
    //             document.dispatchEvent(new Event("wxConfigReady"));
    //         }
    //         console.log("wx.checkJsApi result:", res.checkResult);
    //     },
    //     fail: function (res) {
    //         console.log("wx.checkJsApi fail:", res);
    //     }
    // });
    console.log("【wx.ready OK】")  
    if (PROJECT_CONFIG.is_wx_share) _shareConfigure()
  })
  wx.error(function (res) {
    console.log("wx.config error:", res);
    _wxConfig();
  })
}
//微信、QQ分享配置
function _shareConfigure() {
  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  wx.updateAppMessageShareData({ 
    title: SHARECONFIG.Title, // 分享标题
    desc: SHARECONFIG.Desc, // 分享描述
    link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: SHARECONFIG.ShareImage, // 分享图标
    success: function () {
      // 设置成功
      console.log('【分享配置OK1】')
    }
  })
  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  wx.updateTimelineShareData({ 
    title: SHARECONFIG.Title, // 分享标题
    link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: SHARECONFIG.ShareImage, // 分享图标
    success: function () {
      // 设置成功
      console.log('【分享配置OK2】')
    }
  })
  //2.1监听“分享到朋友”按钮点击、自定义分享内容及分享结果接口(旧)
  wx.onMenuShareAppMessage({
    title: SHARECONFIG.Title, // 分享标题
    desc: SHARECONFIG.Desc, // 分享描述
    link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: SHARECONFIG.ShareImage, // 分享图标
    success: function() {
      console.log('【分享配置OK3】')
    },
    cancel: function() {},
    fail: function() {}
  });
    
  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口(旧)
  wx.onMenuShareTimeline({
    title: SHARECONFIG.Title, // 分享标题
    desc: SHARECONFIG.Desc, // 分享描述
    link: SHARECONFIG.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: SHARECONFIG.ShareImage, // 分享图标
    success: function() {
      console.log('【分享配置OK4】') 
    },
    cancel: function() {},
    fail: function() {}
  });
}