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
const AUTH_URL = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_tests/index.php'
//获取用户信息请求地址
const GET_USER_INFO_URL = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_tests/api.php?a=get_session'
//本地请求代理请求地址
const REQUEST_PROXY_URL = '/api'
//核弹系统接口请求地址短码code
const PROJECT_CONFIG_CODE = 'tJ4GXH2P2luArDVm0u9'
//静态资源地址
const ASSETS_URL = 'https://game.flyh5.cn/resources/game/wechat/xw/rc_qc/assets_3.0/'
//默认分享配置信息
const SHARECONFIG = {
  ShareUrl: window.location.href,
  Title: '专注vue',
  Desc: 'vue是一套用于构建用户界面的渐进式JavaScript框架。',
  ShareImage: 'http://game.flyh5.cn/resources/game/wechat/szq/images/avatar_01.jpg'
} 
//项目开关配置信息
const PROJECT_CONFIG = {
  is_loading_page: false,//是否配置loading预加载页
  wx_jssdk_type: 1,//获取微信jssdk注册参数类型：0为加载script标签获取，1为请求接口形式获取
  /*从后端链接授权后获取后台带过来的用户数据配置*/
  getUserInfo: {
    is_open: true,//是否加载页面后自动获取后存储到本地两种缓存中
    type: 1,//获取方式：1为从本地缓存或者url中获取，2为请求后端接口获取
    get_data_list: ['openid', 'token', 'nickname', 'avatar'],//从本地缓存或者url中获取的字段名列表
    response: "res.data.data"//从后端接口请求返回的数据字段格式
  },
  /*刷新页面后路由处理配置*/
  refresh_back_to_home: {
    is_open: false,//是否回到首页，hash模式路由默认刷新后停留在当前页
    home_url: '/'//首页的路由地址,也可以配置其它想跳转的路由地址
  },
  is_page_locking: false,//是否锁定页面上拉下拉滑动
  is_wx_share: true,//是否配置分享
  is_tx_mtah5: false,//是否配置腾讯统计
  /*背景音乐配置*/  
  is_background_music: {
    is_open: false,//是否开启背景音乐
    type: 0,//播放形式：0为audio标签播放，1为当页面中有video标签时安卓机采用js方法播放，2为采用js方法播放
    constrols_btn_url: [require('assets/images/music_01.png'), require('assets/images/music_02.png')]//播放暂停按钮icon图片路径 
  },
  /*绿标配置*/
  vConsole: {
    is_open: 2,//是否开启绿标:0为不开启，1为永久开启，2为本地开发不开启线上永久开启，3为本地开发不开启线上在项目上线日期前开启
    green_label_color: "linear-gradient(-90deg, #F28F29 0, #027C60 100%)",//浮标颜色
    green_label_position: '0',//绿标初始位置boottom，单位px、rem
    green_label_title: "未上线版本"//浮标文字
  },
  is_offline_sign_out: false,//项目下线后是否关闭退出项目
}
//第三方密钥配置信息
const SECRETKEY = {
  secretkey_qq_map: 'GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ',//腾讯地图位置密钥
  secretkey_baidu_map: 'AqHbeO1DTPXX06zcMKTqhhOAHkyqnqxY',//百度地图位置密钥
  secretkey_amap_map: '36b7d67054e5dcd7d391ab517478ccfe',//高德地图位置密钥
  secretkey_juhe_phone_region: '40c2bcf1f7d2b93fe86254759ba95d6d',//聚合数据获取手机号归属地密钥
  secretkey_jisu_phone_region: '61c24049fd659e7f'//极速数据获取手机号归属地密钥
} 

export {
  ERR_Ok,     
  ERR_NO,     
  ASSETS_URL,     
  WXCONFIG_URL, 
  WXCONFIG_SCRIPT_URL,    
  REQUEST_URL,     
  REQUEST_PROXY_URL,
  PROJECT_CONFIG_CODE, 
  AUTH_URL,
  GET_USER_INFO_URL,
  SHARECONFIG,
  SECRETKEY,
  PROJECT_CONFIG   
}