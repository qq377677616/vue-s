<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <template v-if="type == 0">
      <div>
        <div class="box" id="con-one"><div class="con"></div></div>
        <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[0] ? 'on' : '']" ref="con1"></div>
        <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[1] ? 'on' : '']" ref="con2"></div>
        <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[2] ? 'on' : '']" ref="con3"></div>
        <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[3] ? 'on' : '']" ref="con4"></div>
      </div>
    </template>
    <template v-if="type == 1">
      <scroll class="con" @scroll="scroll" :listen-scroll="listenScroll">
        <div>
          <div class="box" id="con-one"><div class="con"></div></div>
          <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[0] ? 'on' : '']" ref="con1"></div>
          <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[1] ? 'on' : '']" ref="con2"></div>
          <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[2] ? 'on' : '']" ref="con3"></div>
          <div class="box" :class="[scrollTop + pageWindowHeight.height >= scrollTopList[3] ? 'on' : '']" ref="con4"></div>
        </div>
      </scroll>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import Scroll from 'base/scroll/scroll.vue'
import { getScreenWidthHeight, getDomPageDistance } from "assets/js/util"
export default {
  name: "",
  data() {
    return {
      pageTitle: "滑动淡出",
      type: 1,//滚动类别：0为html自身滚动（需关闭固定页面开关），1为滚动插件滚动
      listenScroll: true,
      scrollTop: 0,
      pageWindowHeight: 0,
      scrollTopList: []
    }
  },
  mounted() {
    getScreenWidthHeight().then(res => { this.pageWindowHeight = res })
    if (this.type == 0) {
      window.addEventListener("scroll", this.windowScroll , false)
    }
    this.$nextTick(() => { this.scrollShowInit() })
  },
  methods: {
    //html页面自身滚动监听
    windowScroll(e) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    //滚动插件滚动监听
    scroll(e) {
      this.scrollTop = -e.y
      console.log("this.scrollTop", this.scrollTop)
    },
    //获取各个dom的top值
    scrollShowInit(){
      Promise.all([getDomPageDistance(this.$refs.con1), getDomPageDistance(this.$refs.con2), getDomPageDistance(this.$refs.con3), getDomPageDistance(this.$refs.con4)]).then(res => {
        let _scrollTopList = []
        for (let i = 0; i < res.length; i++) { 
          _scrollTopList.push(res[i].top)
        }
        this.scrollTopList = _scrollTopList
      })
    }
  },
  components: {
    MyHeader,
    Scroll
  }
}
</script>

<style scoped>
  .con{height: 100vh;overflow: hidden;}
  .body .box{height:8rem;background: green;}
  /* .body .box:nth-child(1){height:auto;} */
  .body .box:nth-child(2){background: purple;}
  .body .box:nth-child(3){background: orange;}
  .body .box:nth-child(4){background: blue;}
  .body .box:nth-child(5){background: black;}
  .body .box .con{height:6rem;}
  .body .box:nth-child(2),.body .box:nth-child(3),.body .box:nth-child(4),.body .box:nth-child(5){transform: translateY(3rem);opacity: 0;transition: all .7s;}
  .body .box.on{transform: translateY(0);opacity: 1;}
</style>