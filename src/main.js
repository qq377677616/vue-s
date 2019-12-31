import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'assets/js/rem'
import 'assets/js/default'
import 'assets/js/wx-config'
import 'assets/css/reset.css'
import 'assets/css/base.css'
import VueTouch from "vue-touch"
import Vant from 'vant'
import 'vant/lib/index.css'
import clipper from 'assets/js/clipper'

Vue.config.productionTip = false
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant)
Vue.use(VueLazyload, {
  // loading: require('assets/images/default.png')
})
Vue.use(clipper)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
