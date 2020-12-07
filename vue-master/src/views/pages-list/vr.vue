<template>
  <div class="body vr">
    <my-header :title="pageTitle" ref="header"></my-header>
    <div class="con flex-cen">
      <button class="start" @click="webArInit" v-if="videoDeviceList.length == 0">一键开启AR</button>
      <div class="box">
        <div class="img-sequence pof flex-cen" v-show="showType != -1">
          <div class="sequence" v-show="showType == 0">
            <sequence-effect :sequenceList="sequenceList3" ref="sequence1"></sequence-effect>
          </div>
          <img :src="arImg" alt="" v-show="showType == 1">
          <div @click="showType = -1" class="close">&times;</div>
        </div>
        <div class="btns flex-aro" v-if="isStart">
          <button @click="playAnimation">动画/拍照</button>
          <button @click="openCamera()">前/后摄像头</button>
          <button @click="captureVideo">拍照</button>
        </div>
      </div>
      <div @click="back">
        <right-guide v-if="isShowRightGuide"></right-guide>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "components/header.vue"
import RightGuide from 'base/RightGuide.vue'
import SequenceEffect from 'base/SequenceEffect.vue'
import api from 'api/api'
import WebAR from 'assets/js/webar'
import { ASSETS_URL } from 'api/project.config'
import { isSystem } from 'assets/js/util'
export default {
  name: 'vr',
  data() {
    return {
      pageTitle: "VR",
      isShowRightGuide: false,//是否显示提示蒙层
      webAr: null,//webar实例
      videoDeviceList: [],//可用摄像头
      videoDeviceIndex: 1,//摄像头索引
      arImg: '',//图片
      isStart: false,//是否打开webar
      sequenceList3: { url: `${ASSETS_URL}images/sequence/home/cow/loading/loading_0.png`, num: 8, initIndex: 1, speed: 100, loop: true, autoplay: true },//中牛
      // sequenceList3: { url: `${ASSETS_URL}images/sequence/home/cow/loading/loading_`, num: 8, speed: 100, startIndex: 0, loop: true, type: 'png' },//序列
      showType: -1//显示动画、照片
    }
  },
  mounted() {
    this.isSystem()
  },
  methods: {
    //动画、拍照切换
    playAnimation() {
      this.showType == 0 ? this.showType = 1 : this.showType = 0
    },
    //AR初始化
    webArInit() {
      this.webAr = new WebAR()
      console.log("this.webAr", this.webAr)
        this.webAr.listCamera().then(res => {
          console.log("可用摄像头", res)
          this.videoDeviceList = res
          this.openCamera(true)
        }) .catch(err => {
        // 没有找到摄像头
        console.info(err);
      })
    },
    //打开摄像头
    openCamera(open) {
      if (!open) { this.videoDeviceIndex == 0 ? this.videoDeviceIndex = 1 : this.videoDeviceIndex = 0 }
      this.webAr.openCamera(this.videoDeviceList[this.videoDeviceIndex]).then(msg => {
        this.isStart = true
        console.log("【摄像头打开成功】");
      }).catch(err => {
        console.log("【摄像头打开失败】");
      });
    },
    //拍照
    captureVideo() {
      let _this = this
      this.webAr.captureVideo().then(res => {
        console.log("拍照返回的图片", res.slice(0, 30))
        _this.showType = 1
        _this.arImg = res
      })
    },
    //返回
    back() {
      this.$refs.header.back()
    },
    //判断手机系统
    isSystem() {
      isSystem().then(res => {
        this.isShowRightGuide = (res.isiOS && res.isWx)
      })
    }
  },
  components: {
    RightGuide,
    SequenceEffect,
    MyHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vr{background:linear-gradient(135deg,#FFCD43 0%, #0088D2 100%);padding-bottom: 1rem;box-sizing: border-box;}
  .body, .con{height:100%;font-size:.8rem;font-style:italic;color:#fff;}
  .start{background:linear-gradient(-135deg,#0088D2 0%, #A8271E 100%);padding:.2rem;border-radius: .1rem;font-size: .3rem;position: relative;z-index: 50;}
  .img-sequence{z-index: 150;}
  .img-sequence img{width: 60%;height: auto;margin-top: -2rem;}
  .btns{position: fixed;width: 100%;left:0;bottom:0;padding-bottom: 2rem;z-index: 200;}
  .btns button{width:2rem;height: .8rem;background: #0DBC79;color:#fff;border-radius: .1rem;font-size: .3rem;}
  .sequence{width: 3.76rem;height: 4.18rem;position: relative;}
  .close{font-size: 40px;font-weight: bold;position: absolute;right:0;top:0;padding:10px 20px;color:#fff;font-style: initial;}
</style>
