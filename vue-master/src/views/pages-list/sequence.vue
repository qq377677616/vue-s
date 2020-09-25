<template>
  <div class="body"> 
    <my-header :title="pageTitle"></my-header>
    <!-- 背景 -->
    <div class="full-screen">
      <sequence-effect :sequenceList="sequenceList" @loadOk="loadOk"></sequence-effect>
    </div>
    <div class="cow-box flex-cen-col">
      <div class="flex-cen">
        <!-- 小牛 -->
        <div class="cow" @click="sequencePlay">
          <sequence-effect :sequenceList="sequenceList2" ref="sequence"></sequence-effect>
        </div>
        <!-- 中牛 -->
        <div class="cow" @click="sequencePlay1">
          <sequence-effect :sequenceList="sequenceList3" ref="sequence1"></sequence-effect>
        </div>
        <!-- 大牛 -->
        <div class="cow" @click="sequencePlay2">
          <sequence-effect :sequenceList="sequenceList4" ref="sequence2"></sequence-effect>
        </div>
      </div>
      <div class="flex-cen">
        <!-- 小牛 -->
        <div class="cow">
          <sequence-effect :sequenceList="sequenceList5" ref="sequence3"></sequence-effect>
        </div>
        <!-- 中牛 -->
        <div class="cow" @click="sequencePlay4">
          <sequence-effect :sequenceList="sequenceList6" ref="sequence4"></sequence-effect>
        </div>
        <!-- 大牛 -->
        <div class="cow">
          <sequence-effect :sequenceList="sequenceList7" ref="sequence5">
            <img v-for="(item, index) in 20" :key="'key'+item" :src="require('../../assets/images/xiao/daxiao_'+index+'.png')" class="poa" :class="sequenceListIndex == index ? 'on' : ''" />
          </sequence-effect>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import SequenceEffect from 'base/SequenceEffect.vue'
import { ASSETS_URL } from 'api/project.config'
export default {
  name: "",
  data() {
    return {
      pageTitle: "序列帧",
      isPlaySmall: false,//点击小牛开关
      isPlayModerate: false,//点击中牛开关
      isPlayBig: false,//点击大牛开关
      isPlayBig2: false,//点击大牛开关2
      sequenceListIndex: 0,//本地图片时序列索引
      /**
       * 配置说明
       * @method 序列图信息
       * @for sequenceList
       * @param { String } url 第一张序列图片的完整地址
       * @param { Number } num 序列图片的总张数
       * @param { Number } initIndex 初始展示第几张图片（从1开始）
       * @param { Number } pauseIndex 自动播放到第几张图片暂停（从1开始）
       * @param { Number } speed 播放速率（毫秒，越小越快）
       * @param { Boolean || String } loop 是否循环播放(true：循环、false：不循环、'3'：循环播放3次、5：播放到第5张暂停)
       * @param { Boolean } autoplay 是否自动播放
       * @param { String } sequenceIndex 为本地图片时索引变量（img的动态class中、data中、组件传参中三者保持一致）[当为本地图片时生效]
       * @param { Object } page 当前页面[当为本地图片时生效]
       * 
       */
      sequenceList: { url: `${ASSETS_URL}images/sequence/home/bg_huanghun/huanghun_0.jpg`, num: 22, initIndex: 1, speed: 100, loop: true, autoplay: true },//背景
      sequenceList2: { url: `${ASSETS_URL}images/sequence/home/cow/xiao/richang/xiaoniu_0.png`, num: 20, initIndex: 1, speed: 100, loop: true, autoplay: false },//小牛
      sequenceList3: { url: `${ASSETS_URL}images/sequence/home/cow/zhong/chicao/zhongcao_0.png`, num: 20, initIndex: 1, speed: 100, loop: 5, autoplay: true },//中牛
      sequenceList4: { url: `${ASSETS_URL}images/sequence/home/cow/da/zayan/dayan_0.png`, num: 20, initIndex: 1, speed: 100, loop: false, autoplay: false },//大牛
      sequenceList5: { url: `${ASSETS_URL}images/sequence/home/cow/xiao/xiao/xiaoxiao_0.png`, num: 20, initIndex: 1, speed: 100, loop: '3', autoplay: true },//小牛2
      sequenceList6: { url: `${ASSETS_URL}images/sequence/home/cow/zhong/zayan/zhongyan_0.png`, num: 20, initIndex: 1, speed: 100, loop: false, autoplay: false },//中牛2
      sequenceList7: { url: '../../assets/images/xiao/daxiao_0.png', sequenceIndex: "sequenceListIndex", page: this, num: 20, initIndex: 1, speed: 100, loop: true, autoplay: true }//大牛2
    }
  },
  created() {
  
  },
  methods: {
    //点击小牛开始[默认是展示第一张，然后点击开始循环播放]
    sequencePlay() {
      if (this.isPlaySmall) return
      this.isPlaySmall = true
      this.$refs.sequence.play()
    },
    //点击中牛开始[初始化在设定的某张，然后点击开始播放（不传则只会播放一次，传true则会循环播放）]
    sequencePlay1() {
      if (this.isPlayModerate) return
      this.isPlayModerate = true
      this.$refs.sequence1.play()
    },
    //点击大牛开始[点击播放自动停止在设定的某张(传number数字)，然后控制可以播放后续（不传则只会播放一次，传true则会循环播放）]
    sequencePlay2() {
      if (this.isPlayBig) return
      this.isPlayBig = true
      this.$refs.sequence2.play(8)
      setTimeout(() => {
        console.log("【继续播放】")
        this.$refs.sequence2.play().then(() => {
          alert("播放完成")
          this.isPlayBig = false
        })
      }, 2000)
    },
    //点击大牛开始有限次数循环播放[传字符串数字为循环次数]
    sequencePlay4() {
      if (this.isPlayBig2) return
      this.isPlayBig2 = true
      console.log("【循环播放3次】")
      this.$refs.sequence4.play('3').then(() => {
        alert("播放完成")
        this.isPlayBig2 = false
      })
    },
    //序列加载ok
    loadOk() {
      console.log("【第一套序列加载完成】")
    }
  },
  components: {
    MyHeader,
    SequenceEffect
  }
}
</script>

<style scoped>
  .cow-box{position: fixed;width: 100vw;left:0;bottom:2vh;z-index: 20;}
  .cow-box>div{width: 100%;}
  .cow{width: 3.28rem;height: 3.88rem;position: relative;}
  .cow-box>div:nth-child(2){margin-top: -.7rem;}
</style>