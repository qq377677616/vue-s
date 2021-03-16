<template>
  <div id="app">
    <!-- 路由视图 -->
    <transition :name="transitionName"><router-view class="router-view" :class="{'on': !transitionName}" @playPause="playPause" /></transition>
    <!-- 背景音乐 -->
    <my-audio ref="audio" v-if="PROJECT_CONFIG.is_background_music.is_open"></my-audio>
    <!-- 加载页 -->
    <loading-page v-if="PROJECT_CONFIG.is_loading_page" :pageLoadingOk="pageLoadingOk" @loadingOk="loadingOk" @curPro="curPro">
      <!-- <div class="full-screen my-pro flex-cen" style="font-size:50px;background:#972F24;color:#fff;"><span>{{pro}}%</span></div> -->
    </loading-page>
  </div>
</template>
 
<script>
import myAudio from 'base/audio'
import VConsole from 'vconsole'
import LoadingPage from 'base/loading-page.vue'
import { PROJECT_CONFIG, PROJECT_CONFIG_CODE } from 'api/project.config'
import { loadingPage } from 'assets/js/imgPreloader'
import { loadScript } from "assets/js/util"
import { setDataArrive } from "api/api.config"
import { getTest } from "api/api"
if (PROJECT_CONFIG.vConsole.is_open) { const vConsole = new VConsole() }
export default {
  name: 'app',
  mixins: [loadingPage], 
  data() {
    return { 
      pro: 0,
      pageLoadingOk: false,
      transitionName: 'right-left'
    }
  },
  computed: { key() { 
    console.log("this.$route", )
    return this.$route.fullPath;
   } },
  created() {
    console.log("createdcreatedcreated")
    this.PROJECT_CONFIG = PROJECT_CONFIG//页面配置信息
  },
  mounted() {
    console.log("mountedmountedmounted")
    if (this.PROJECT_CONFIG.is_page_locking) { this.pageLocking() }//锁定页面
  },
  methods: {
    //loading加载
    loadingOk() {
      console.log("【加载完成】")
    },
    //当前进度
    curPro(e) {
      this.pro = e.pro
    },
    //vuex
    vuexConfig() {
      sessionStorage.getItem("state") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("state")))
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("state", JSON.stringify(this.$store.state))
      })
    },
    //页面下拉锁定(效果同于在最外层#app盒子上添加@touchmove.prevent事件)
    pageLocking() {
      document.getElementById('app').addEventListener('touchmove', e => { e.preventDefault() /*e.stopPropagation();*/ }, { passive: false })
    },
    //外部控制背景音乐播放暂停
    playPause() {
      this.$refs.audio.playPause()
    }
  },
  watch: {
    //路由监听
    // $route: {
    //   immediate: true,
    //   handler(val, oldVal){
    //     console.log("val", val);
    //     console.log("oldVal", oldVal);
    //   },
    //   // 深度观察监听
    //   deep: true
    // }, 
    '$route'(to, from) {
      console.log("从from", from)
      console.log("到to", to)
      if (!from.name && this.PROJECT_CONFIG.refresh_back_to_home.is_open) this.$router.replace(this.PROJECT_CONFIG.refresh_back_to_home.home_url)
      let _tabbar = ['/', '/about']//tabBar导航页
      let _secondLevel = ['/cropper', '/upload', '/prize', '/poster']//二级页面
      let _setData = ['/', '/poster']//数据统计页：首页、结果页
      //路由动画
      if (from.path != to.path &&_tabbar.includes(from.path) && _tabbar.includes(to.path)) {
        this.transitionName = ''
      } else if (_tabbar.includes(from.path) || (_secondLevel.includes(from.path) && !_tabbar.includes(to.path))) {
        this.transitionName = 'right-left' 
      } else if (_tabbar.includes(to.path) || (_secondLevel.includes(to.path) && !_tabbar.includes(from.path))) {
        this.transitionName = 'left-right'
      }
      //数据统计
      if (PROJECT_CONFIG.is_data_statistics && PROJECT_CONFIG_CODE && _setData.includes(to.path)) setDataArrive({ status: _setData.findIndex(item => item == to.path) + 1 }).then(res => { console.log("【数据统计--抵达页成功】") })
    }
  },
  components: {
    myAudio,
    LoadingPage
  }
}
</script>

<style>
  @import 'assets/css/font-icon.css';
  /* *{touch-action: pan-y;} */
  .body{min-height:100vh;padding-top: .92rem;box-sizing: border-box;}
  .con-box{min-height:calc(100vh - .92rem);display: flex;flex-direction: column;justify-content: center;align-items: center;}
  .item-list dd{border:1px solid #333;padding:.2rem .3rem;margin:.5rem 0;text-align: center;}
  .router-view{transition: all .5s cubic-bezier(.55,0,.1,1);position: absolute;left:0;top:0;width: 100%;min-height:100vh;max-width: 750px;}
  .router-view.on{transition: none;}
  /* .router-view{position: absolute;left:0;top:0;width: 100vw;min-height:100vh;} */
  .right-left-enter,.left-right-leave-to{transform: translateX(100%);opacity: 0;}
  .right-left-leave-to,.left-right-enter{transform: translateX(-100%);opacity: 0;}
  .bottom-top-enter,.top-bottom-leave-to{transform: translateY(100%) scale(1);opacity: 0;}
  .bottom-top-leave-to,.top-bottom-enter{transform: translateY(-100%) scale(.8);opacity: 0;}
  .scale-big-enter,.scale-small-leave-to{transform: scale(.5);opacity: 0;}
  .scale-big-leave-to,.scale-small-enter{transform: scale(1);opacity: 0;}
  .full-screen{width:100%;height:calc(100vh - .92rem);}
  @media screen and (min-width: 640px) {
    .router-view{left:50%;transform: translateX(-50%);}
  }
</style>
