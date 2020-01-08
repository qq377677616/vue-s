<template>
  <div id="app">
    <transition :name="transitionName"><router-view class="router-view" @touchmove.prevent/></transition>
    <my-audio v-if="PROJECT_CONFIG.is_background_music"></my-audio>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import myAudio from 'base/audio/audio'
import { PROJECT_CONFIG } from 'api/config'
export default {
  name: 'app',
  data() {
    return {
      transitionName: 'right-left'
    }
  },
  created() {
    this.vuexConfig()//vuex
    this.PROJECT_CONFIG = PROJECT_CONFIG
  },
  methods: {
    vuexConfig() {
      sessionStorage.getItem("state") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("state")))
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("state", JSON.stringify(this.$store.state))
      })
    }
  },
  watch: {
    '$route'(to, from) {
      // console.log("从from", from)
      // console.log("到to", to)
      let _tabbar = ['/', '/about']//tabBar导航页
      let _secondLevel = ['/cropper', '/prize']//二级页面
      if (_tabbar.includes(from.path) && _tabbar.includes(to.path)) {
        this.transitionName = ''
      } else if (from.path == '/' || (_secondLevel.includes(from.path) && to.path != "/")) {
        this.transitionName = 'right-left' 
      } else if (to.path == '/' || (_secondLevel.includes(to.path) && from.path != "/")) {
        this.transitionName = 'left-right'
      }
    }
  },
  components: {
    myAudio
  }
}
</script>

<style>
  @import 'assets/fonts/font-icon.css';
  .body{min-height:100vh;overflow-x: hidden;padding-top: .92rem;box-sizing: border-box;}
  .con-box{min-height:calc(100vh - .92rem);display: flex;flex-direction: column;justify-content: center;align-items: center;}
  .item-list dd{border:1px solid #333;padding:.2rem .3rem;margin:.5rem 0;text-align: center;}
  .router-view{transition: all .5s cubic-bezier(.55,0,.1,1);position: absolute;left:0;top:0;width: 100vw;min-height:100vh;}
  .right-left-enter,.left-right-leave-to{transform: translateX(100%);opacity: 0;}
  .right-left-leave-to,.left-right-enter{transform: translateX(-100%);opacity: 0;}
  .bottom-top-enter,.top-bottom-leave-to{transform: translateY(60%) scale(1);opacity: 0;}
  .bottom-top-leave-to,.top-bottom-enter{transform: translateY(-60%) scale(.8);opacity: 0;}
  .full-screen{width:100vw;height:calc(100vh - .92rem);}
</style>
