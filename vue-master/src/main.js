import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import VueI18n from 'vue-i18n'
import 'assets/js/rem'
import 'assets/js/default'
import 'assets/js/wx-config'
import 'assets/css/reset.css'
import 'assets/css/base.css'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
// VideoPlayer.config({

//   youtube: true,
  
//   switcher: true,
  
//   hls: true
  
//   })
  
  Vue.use(VideoPlayer)
import VueTouch from "vue-touch"
import Vant from 'vant'
import 'vant/lib/index.css'
import clipper from 'assets/js/clipper'
import LangEn from 'assets/lang/en'
import LangZhCHS from 'assets/lang/zhCHS'
import LangZhCHT from 'assets/lang/zhCHT'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant)
Vue.use(VueLazyload, {
  // loading: require('assets/images/default.png')
})
//多语言
const i18n = new VueI18n({
  locale: localStorage.getItem('i18nLocale') || 'zh-CHT',
  messages: {
    'en': LangEn,
    'zh-CHS': LangZhCHS,
    'zh-CHT': LangZhCHT
  },
  silentTranslationWarn: true
})
Vue.use(clipper)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')