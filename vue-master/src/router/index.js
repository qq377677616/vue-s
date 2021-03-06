import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'index',
    component: resolve => require(['../views/index.vue'], resolve)    
  },
  {
    path:'/about',
    name: 'about',
    component: resolve => require(['../views/about.vue'], resolve)    
  },
  {
    path:'/vuex',
    name: 'vuex',
    component: resolve => require(['../views/pages-list/vuex.vue'], resolve)    
  },
  {
    path:'/upload',
    name: 'upload',
    component: resolve => require(['../views/pages-list/upload/index.vue'], resolve)    
  },
  {
    path:'/upload/upload1',
    name: 'upload1',
    component: resolve => require(['../views/pages-list/upload/upload1.vue'], resolve)    
  },
  {
    path:'/upload/upload2',
    name: 'upload2',
    component: resolve => require(['../views/pages-list/upload/upload2.vue'], resolve)    
  },
  {
    path:'/upload/upload3',
    name: 'upload3',
    component: resolve => require(['../views/pages-list/upload/upload3.vue'], resolve)    
  },
  {
    path:'/upload/upload4',
    name: 'upload4',
    component: resolve => require(['../views/pages-list/upload/upload4.vue'], resolve)    
  },
  {
    path:'/cropper',
    name: 'cropper-index',
    component: resolve => require(['../views/pages-list/cropper/index.vue'], resolve)
  },
  {
    path: '/cropper/cropper1',
    name: 'cropper1',
    component: resolve => require(['../views/pages-list/cropper/cropper1.vue'], resolve)
  },
  {
    path: '/cropper/cropper2',
    name: 'cropper2',
    component: resolve => require(['../views/pages-list/cropper/cropper2.vue'], resolve)
  },
  {
    path:'/drag',
    name: 'drag',
    component: resolve => require(['../views/pages-list/drag.vue'], resolve)    
  },
  {
    path:'/list_sort',
    name: 'listSort',
    component: resolve => require(['../views/pages-list/list-sort.vue'], resolve)    
  },
  {
    path:'/poster',
    name: 'poster',
    component: resolve => require(['../views/pages-list/poster/index.vue'], resolve)    
  },
  {
    path:'/poster/poster1',
    name: 'poster1',
    component: resolve => require(['../views/pages-list/poster/poster1.vue'], resolve)    
  },
  {
    path:'/poster/poster2',
    name: 'poster2',
    component: resolve => require(['../views/pages-list/poster/poster2.vue'], resolve)    
  },
  {
    path:'/poster/poster3',
    name: 'poster3',
    component: resolve => require(['../views/pages-list/poster/poster3.vue'], resolve)    
  },
  {
    path:'/mail_list',
    name: 'mailList',
    component: resolve => require(['../views/pages-list/mail-list.vue'], resolve)    
  },
  {
    path:'/map',
    name: 'map',
    component: resolve => require(['../views/pages-list/map.vue'], resolve)    
  },
  {
    path:'/prize',
    name: 'prize',
    component: resolve => require(['../views/pages-list/prize'], resolve)    
  },
  {
    path:'/prize/prize1',
    name: 'prize1',
    component: resolve => require(['../views/pages-list/prize/prize1.vue'], resolve)    
  },
  {
    path:'/prize/prize2',
    name: 'prize2',
    component: resolve => require(['../views/pages-list/prize/prize2.vue'], resolve)    
  },
  {
    path:'/prize/prize3',
    name: 'prize3',
    component: resolve => require(['../views/pages-list/prize/prize3.vue'], resolve)    
  },
  {
    path:'/prize/prize4',
    name: 'prize4',
    component: resolve => require(['../views/pages-list/prize/prize4.vue'], resolve)    
  },
  {
    path:'/prize/prize5',
    name: 'prize5',
    component: resolve => require(['../views/pages-list/prize/prize5.vue'], resolve)    
  },
  {
    path:'/vue_event',
    name: 'vueEvent',
    component: resolve => require(['../views/pages-list/vue-event.vue'], resolve)    
  },
  {
    path:'/code',
    name: 'code',
    component: resolve => require(['../views/pages-list/code.vue'], resolve)    
  },
  {
    path:'/create_gif',
    name: 'createGif',
    component: resolve => require(['../views/pages-list/create-gif.vue'], resolve)    
  },
  {
    path:'/sequence',
    name: 'sequence',
    component: resolve => require(['../views/pages-list/sequence.vue'], resolve)    
  },
  {
    path:'/picker',
    name: 'picker',
    component: resolve => require(['../views/pages-list/picker.vue'], resolve)    
  },
  {
    path:'/lang',
    name: 'lang',
    component: resolve => require(['../views/pages-list/lang.vue'], resolve)    
  },
  {
    path:'/img_code',
    name: 'imgCode',
    component: resolve => require(['../views/pages-list/img-code.vue'], resolve)    
  },
  {
    path:'/scroll_show',
    name: 'scrollShow',
    component: resolve => require(['../views/pages-list/scroll-show.vue'], resolve)    
  },
  {
    path:'/baberrage',
    name: 'baberrage',
    component: resolve => require(['../views/pages-list/baberrage.vue'], resolve)    
  },
  {
    path:'/krpano',
    name: 'krpano',
    component: resolve => require(['../views/pages-list/krpano/krpano.vue'], resolve)    
  },
  {
    path:'/live',
    name: 'live',
    component: resolve => require(['../views/pages-list/live.vue'], resolve)    
  },
  {
    path:'/three',
    name: 'three',
    component: resolve => require(['../views/pages-list/three.vue'], resolve)    
  },
  {
    path:'/panorama360',
    name: 'panorama360',
    component: resolve => require(['../views/pages-list/panorama360.vue'], resolve)    
  },
  {
    path:'/book',
    name: 'book',
    component: resolve => require(['../views/pages-list/book.vue'], resolve)    
  },
  {
    path:'/echarts/map-china',
    name: 'mapChina',
    component: resolve => require(['../views/pages-list/echarts/map-china.vue'], resolve)    
  },
  {
    path:'/vr',
    name: 'vr',
    component: resolve => require(['../views/pages-list/vr.vue'], resolve)
  },
  {
    path:'/color_picker',
    name: 'colorPicker',
    component: resolve => require(['../views/pages-list/ColorPicker.vue'], resolve)
  },
  {
    path:'/scroll',
    name: 'BetterScroll',
    component: resolve => require(['../views/pages-list/BetterScroll.vue'], resolve)
  },
  {
    path:'/set_share',
    name: 'SetShare',
    component: resolve => require(['../views/pages-list/SetShare.vue'], resolve)
  },
  {
    path:'/compress_img',
    name: 'CompressImg',
    component: resolve => require(['../views/pages-list/compress/CompressImg.vue'], resolve)
  },
  {
    path:'/shake_throttle',
    name: 'shakeThrottle.vue',
    component: resolve => require(['../views/pages-list/ShakeThrottle.vue'], resolve)
  },
  {
    path:'/jump_weapp',
    name: 'jumpWeapp.vue',
    component: resolve => require(['../views/pages-list/JumpWeapp.vue'], resolve)
  },
  {
    path:'/wechat_payment',
    name: 'wechatPayment.vue',
    component: resolve => require(['../views/pages-list/WechatPayment.vue'], resolve)
  },
  {
    path:'/validator_form',
    name: 'validatorForm.vue.vue',
    component: resolve => require(['../views/pages-list/ValidatorForm.vue'], resolve)
  },
  {
    path:'/test',
    name: 'test',
    component: resolve => require(['../views/pages-list/test.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  // base: process.env.NODE_ENV === 'dev' ? '' : '/resources/game/wechat/szq/vue-s/', // 两边斜杠要加
  // publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/szq/vue-s/' : '/',
  // base: process.env.BASE_URL,
  routes
})

export default router
