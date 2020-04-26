import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'assets/js/rem'
import 'assets/js/default'
import 'assets/js/wx-config'
import 'assets/css/reset.css'
import 'assets/css/base.css'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
