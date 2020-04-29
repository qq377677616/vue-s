<template>
  <div class="body poster" :class="{'on': dataURL}" ref="cutScreen">
    <my-header :title="pageTitle"></my-header>
    <div class="poster-box flex-cen">
      <div class="box" :class="{on: isGenerate}" id="poster" v-show="!dataURL">
        <img src="../../../assets/images/poster_03.png" alt="" @load="onload">
        <div class="img-box">
          <VueDragResize :w="vw" :h="vh" outline="none" :isActive="true" :isResizable="true" :aspectRatio="aspectRatio">
        <!-- 　　<div class="vue-drag-resize-box" :style="{width: vw+ 'px',height: vh+'px'}"> -->
        　  <img ref="myImg" src="../../../assets/images/poster_03s.jpg" alt="">
        <!-- 　　</div> -->
          </VueDragResize>
        </div>
      </div>
      <button @click="confirm">生成海报</button>
    </div>
    <div id="poster-img"><div class="fadeShow" v-show="dataURL"><img class="wobble" :src="dataURL" alt=""></div></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import html2canvas from 'html2canvas'
import VueDragResize from "vue-drag-resize"
import { Toast } from 'vant'
export default {
  name: "poster1",
  data() {
    return {
      pageTitle: "DIY版",
      isGenerate: false,//是否在生成中
      aspectRatio: false,//按比例缩放
      dataURL: '',//最后海报地址
      vw: 150,//操作区域宽度
      vh: 1
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    onload() {
      this.vw = this.$refs.myImg.offsetWidth
　    this.vh = this.$refs.myImg.offsetHeight
      this.$nextTick(() => { this.aspectRatio = true })
      // setTimeout(() => { this.aspectRatio = true }, 500)
    },
    confirm() {
      this.isGenerate = true
      setTimeout(() => {
       this.html2canvas()
       Toast.loading({ message: '海报生成中', forbidClick: true, duration: 0 })
      }, 500)
    },
    resize(newRect) {
      // this.vw = newRect.width;
      // this.vh = newRect.height;
      // this.top = newRect.top;
      // this.left = newRect.left;
    },
    html2canvas() {
      this.isScreenShot = true  
      setTimeout(() => {
        //let _app = document.getElementById("app")  
        let _poster = document.getElementById("poster")
        //html2canvas(this.$refs.imageWrapper,{
        html2canvas(_poster, {
          useCORS: true, // 【重要】开启跨域配置
          allowTaint: true,//允许跨域图片
          // taintTest: false,//是否在渲染前测试图片
          backgroundColor: "#fff",
          logging:false,
          width: _poster.offsetWidth - 1,//设置canvas尺寸与所截图尺寸相同，防止白边
          height: _poster.offsetHeight - 1,//防止白边
          scale: 2,
          dpi: window.devicePixelRatio
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png")
          this.dataURL = dataURL
          Toast.clear()
        })
      }, 1000) 
    }
  },
  components: {
    MyHeader,
    VueDragResize
  }
}
</script>

<style scoped>
  .poster{font-size: 0;transition: all .5s;}
  .poster.on{background: #333;}
  .poster-box{height: calc(100vh - .92rem);box-sizing: border-box;font-size: .28rem;opacity: 1;flex-direction: column;}
  .poster-box .box{width:85%;position: relative;font-size: 0;}
  .poster-box .img-box{position: absolute;width:150px;height: 200px;left:50%;top:50%;transform: translate(-50%, -50%);overflow: hidden;border: .1rem solid #fff;border-radius: .1rem;background: #fff;}
  /* .img-box img{width:150px;height: 200px;} */
  #poster-img{position: fixed;width:85%;top:50%;left:50%;transform: translate(-50%, -50%);z-index: 100;}
  button{border-radius: .06rem;background: #07C160;text-align: center;font-size: .3rem;color:#fff;margin: .5rem auto 0;padding:.2rem .4rem;}
  .img-box>>>.vdr-stick{width:.3rem !important;height: .3rem !important;background: #07C160;}
  .img-box>>>.vdr-stick-tm,.img-box>>>.vdr-stick-mr,.img-box>>>.vdr-stick-bm,.img-box>>>.vdr-stick-ml,#poster.on>>>.vdr-stick,.img-box .vdr.active:before{display: none;}
</style>