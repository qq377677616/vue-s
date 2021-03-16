import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import VueI18n from 'vue-i18n'
import 'assets/js/rem'
import 'assets/js/wx.config'
import 'assets/css/reset.css'
import 'assets/css/base.css'
import VueDragResize from 'vue-drag-resize'
import VueTouch from "vue-touch"
import Vant from 'vant'
import 'vant/lib/index.css'
import clipper from 'assets/js/clipper'
import LangEn from 'assets/lang/en'
import LangZhCHS from 'assets/lang/zhCHS'
import LangZhCHT from 'assets/lang/zhCHT'
import echarts from 'echarts'
import VueBus from 'vue-bus'
import FastClick from 'fastclick'
import vshare from 'vshare'
import { VueJsonp } from 'vue-jsonp'
Vue.use(vshare)
FastClick.attach(document.body)
Vue.prototype.$echarts = echarts
Vue.component('vue-drag-resize', VueDragResize)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant)
Vue.use(VueBus)
Vue.use(VueJsonp)
//懒加载
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
//路由钩子
router.beforeEach((form, to, next) => {next()})
export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
