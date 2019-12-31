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
    component: resolve => require(['../views/pages-list/upload.vue'], resolve)    
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
    path:'/list-sort',
    name: 'list-sort',
    component: resolve => require(['../views/pages-list/list-sort.vue'], resolve)    
  },
  {
    path:'/poster',
    name: 'poster',
    component: resolve => require(['../views/pages-list/poster.vue'], resolve)    
  },
  {
    path:'/mail-list',
    name: 'mail-list',
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
    path:'/vue-event',
    name: 'vue-event',
    component: resolve => require(['../views/pages-list/vue-event.vue'], resolve)    
  },
  {
    path:'/code',
    name: 'code',
    component: resolve => require(['../views/pages-list/code.vue'], resolve)    
  },
  {
    path:'/create-gif',
    name: 'create-gif',
    component: resolve => require(['../views/pages-list/create-gif.vue'], resolve)    
  },
  {
    path:'/picker',
    name: 'picker',
    component: resolve => require(['../views/pages-list/picker.vue'], resolve)    
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
