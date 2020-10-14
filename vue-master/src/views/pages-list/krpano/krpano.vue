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
import { getScreenOrientation } from 'assets/js/util'
export default {
  name: "",
  mixins: [krpanoApi],
  data() {
    return {
      pageTitle: "krpano全景",//网页标题
      krpanoPage: null,//krpano页面
      hotspotList1: [//热点组1
        { hotName: "hot1", x: '55', y: '2', w: '112', h: '100', imgSrc:'images/img_01.png', text: '西安市第一', isShow: true, animation: '', click: "switchScene(0)" },
        { hotName: "hot2", x: '300', y: '0', w: '80', h: '80', imgSrc:'images/points_01.png', text: '去餐厅', isShow: true, animation: '64,64,50', click: "switchScene(1)" }
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
      setTimeout(() => {
        console.log("改变视角")
        this.rotationAngle(50, 10, 1)
        // this.setVlookatHlookat(50)
      }, 2000)
    },
    //监听全景加载
    // onxmlcomplete() {
    //   this.krpanoPage.xmlcomplete(true)
    // },
    //初始化全景
    hotspotInit() {
      window.addEventListener('message', e => {
        // console.log("【e.data】", e.data)
        if (e.data.eventName) this[e.data.eventName](e.data)
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