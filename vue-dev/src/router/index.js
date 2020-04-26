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
    path:'/test',
    name: 'test',
    component: resolve => require(['../views/pages-list/test.vue'], resolve)    
  }
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
