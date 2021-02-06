<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="krpano">
      <iframe id="krpano" src="vtour/tour.html" frameborder="0"></iframe>
    </div>
    <div class="pages">
      <div class="btns">
        <button @click="krpanoLoadscene(1)">切换场景</button>
        <button @click="showHideHot(1)">第一批热点</button>
        <button @click="showHideHot(2)">第二批热点</button>
        <button @click="getOpenGyroAuth(1)">开启陀螺仪</button>
        <button @click="getOpenGyroAuth(0)">关闭陀螺仪</button>
        <button @click="playPauseVideos(1)">播放视频</button>
        <button @click="playPauseVideos(0)">暂停视频</button>
      </div>
      <div class="angle flex-cen">
        <div><span class="iconfont icon-ziyuanldpi" :style="{transform: 'rotate('+currentAngle+'deg)'}"></span></div>
      </div>
    </div> 
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { krpanoApi } from 'assets/js/krpano'
import { getScreenOrientation, openGyroscope } from 'assets/js/util'
export default {
  name: "",
  mixins: [krpanoApi],
  data() {
    return {
      pageTitle: "krpano全景",//网页标题
      krpanoPage: null,//krpano页面
      hotspotList1: [//热点组1
        { hotName: "hot1", x: '0', y: '2', w: '112', h: '100', imgSrc:'images/img_01.png', text: '西安市第一', isShow: true, animation: '', click: "switchScene(0)" },
        { hotName: "hot2", x: '300', y: '0', w: '80', h: '80', imgSrc:'images/points_01.png', text: '去餐厅2', isShow: true, animation: '64,64,50', click: "switchScene(1)" },
        { hotName: "hot5", x: '100', y: '0', w: '80', h: '80', imgSrc:'images/points_05.png', text: '这些文字2', isShow: true, animation: '200,200,10', click: "switchScene(1)" }
      ],
      hotspotList2: [//热点组2
        { hotName: "hot3", x: '0', y: '30', w: '50', h: '50', imgSrc:'images/btn4.png', text: '去阳台', isShow: false, animation: '', click: "switchScene(2)" },
        { hotName: "hot4", x: '200', y: '30', w: '100', h: '100', imgSrc:'images/points_02.png', text: '去卫生间', isShow: false, animation: '100,100,50', click: "switchScene(3)" }
      ],
      currentAngle: 0//当前全景旋转角度
    }
  },
  mounted() {
    this.hotspotInit()
  },
  methods: {
    //全景视频播放了
    onvideoready() {
      console.log('【全景视频可以播放了】')
      alert()
      setInterval(() => {
        console.log("【当前全景视频的完整时间和当前播放时间】", this.getKrpanoVideoTime(), this.getKrpanoVideoTime(1))
      }, 1000)
    },
    //全景视频播放完成
    onvideocomplete() {
      console.log('【全景视频播放完成】')
    },
    //打开陀螺仪
    getOpenGyroAuth(type) {
      if (type) {
        openGyroscope().then(res => {
          console.log("【陀螺仪返回】", res)
          this.openGyro()
        })  
      } else {
        this.openGyro(0)
      }
    },
    //暂停、播放视频
    playPauseVideos(type) {
      this.playPauseVideo(type)
    },
    //切换场景
    switchScene(e) {
      this.krpanoLoadscene(e.data, 'elliptic + zoom')
    },
    /**
     * ***常用方法
     */
    //监听全景初始化完成
    onloadcomplete() {
      console.log("【全景初始化完成】")
      this.batchAddHot()
    },
    //监听全景加载
    // onxmlcomplete() {
    //   this.krpanoPage.xmlcomplete(true)
    // },
    //初始化全景
    hotspotInit() {
      //回调事件
      window.addEventListener('message', e => {
        if (e.data.eventName && this[e.data.eventName]) this[e.data.eventName](e.data)
      })
      this.krpanoPage = document.getElementById("krpano").contentWindow
    },
    //监听全景旋转
    onviewchanged(e) {
      // console.log("全景旋转", e)
      this.currentAngle = e.data
    },
    //批量添加热点 
    batchAddHot() {
      this.krpanoAddHotspot(this.hotspotList1)
      this.krpanoAddHotspot(this.hotspotList2)
    },
    //热点显示隐藏 
    showHideHot(type) {
      this.krpanoHideHotspot(this.hotspotList1, type == 1 ? true : false)
      this.krpanoHideHotspot(this.hotspotList2, type == 2 ? true : false)
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .krpano{position: fixed;width:100%;height: 100%;left:0;top:0;z-index: 100;}
  .krpano iframe{width: 100%;height: 100%;}
  .pages{position: fixed;left:0;top:0;z-index: 150;padding-top: .92rem;box-sizing: border-box;width:100%;}
  .btns{position: absolute;right:0;top:.92rem;}
  button{padding:.2rem;margin-bottom: .2rem;display: block;background: #DD5145;color:#fff;}
  .angle{width:2rem;height: 2rem;border-radius: 50%;position: absolute;left:0;top:.92rem;background: #7DCE46;transform: rotate(-45deg);}
  .angle span{font-size: .6rem;display: block;}
</style>