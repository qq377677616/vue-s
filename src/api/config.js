//接口请求成功status状态值
const ERR_Ok = 200
//接口请求失败status状态值
const ERR_NO = 0
//微信config注册配置信息请求接口地址
const WXCONFIG_URL = 'http://game.flyh5.cn/game/twolevel_autho/share.php?auth_appid=wx7c3ed56f7f792d84&isonlyopenid=true'
//微信config注册配置信息script地址
const WXCONFIG_SCRIPT_URL = 'http://game.flyh5.cn/game/twolevel_autho/share.php?auth_appid=wx7c3ed56f7f792d84&type=js&isonlyopenid=true'
//项目接口请求地址
const REQUEST_URL = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_snowflower/public/index.php'
//后端授权链接
const AUTH_URL = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_snowflower/public/index.php'
//本地请求代理请求地址
const REQUEST_PROXY_URL = '/api'
//核弹系统接口请求地址
const PROJECT_CONFIG_URL = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/data_system/api.php?a=web&code=tJ4GXH2P2luArDVm0u9'
//静态资源地址
const ASSETS_URL = 'http://game.flyh5.cn/resources/game/wechat/'
//默认分享配置信息
const SHARECONFIG = {
  ShareUrl: window.location.href,
  Title: '专注vue',
  Desc: "vue是一套用于构建用户界面的渐进式JavaScript框架。",
  ShareImage: "http://game.flyh5.cn/resources/game/wechat/szq/images/avatar_01.jpg"
}
//项目开关配置信息
const PROJECT_CONFIG = {
  wx_jssdk_type: 1,//获取微信jssdk注册参数类型：0为加载script标签获取，1为请求接口形式获取
  is_wx_share: true,//是否配置分享  
  is_background_music: false,//是否开启背景音乐
  is_vconsole: 3,//是否开启绿标:0为不开启，1为永久开启，2为本地开发不开启线上永久开启，3为本地开发不开启线上在项目上线日期前开启
  is_offline_sign_out: false,//项目下线后是否关闭退出项目
}

export {
  ERR_Ok,     
  ERR_NO,     
  ASSETS_URL,     
  WXCONFIG_URL, 
  WXCONFIG_SCRIPT_URL,    
  REQUEST_URL,     
  REQUEST_PROXY_URL,
  PROJECT_CONFIG_URL, 
  AUTH_URL,
  SHARECONFIG,
  PROJECT_CONFIG   
}