<template>
  <div class="body poster" :class="{'on': dataURL}" ref="cutScreen">
    <my-header :title="pageTitle"></my-header>
    <div class="poster-box">
      <div class="box" id="poster" ref="poster">
        <!-- <img src="http://game.flyh5.cn/resources/game/wechat/szq/images/poster_01.png" alt="" @load="onload"> -->
        <!-- <img src="https://img.vrupup.com/web/szq/images/poster_01.png" alt="" @load="onload"> -->
        <div class="text">
          <div class="left">这是一些介绍文字这是一些介绍文字这是一些介绍文字这是<span>88.56</span>一些介绍文字这是一些介绍文字这是。</div>
          <div class="right">
            <p>扬帆</p>
            <!-- <img src="https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132" alt=""> -->
          </div>
        </div>
      </div>
    </div>
    <div id="poster-img"><div class="fadeShow" v-show="dataURL"><img class="wobble" :src="dataURL" alt=""></div></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import html2canvas from 'html2canvas'
import { Toast } from 'vant'
export default {
  name: "poster1",
  data() {
    return {
      pageTitle: "html2canvas",
      dataURL: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.html2canvas()
      Toast.loading({ message: '海报生成中', forbidClick: true, duration: 0 })
    }, 1000)
  },
  methods: {
    onload() {
      setTimeout(() => {
        this.html2canvas()
        Toast.loading({ message: '海报生成中', forbidClick: true, duration: 0 })
      }, 1000)
    },
    html2canvas() {
      this.isScreenShot = true  
      setTimeout(() => {
        console.log("【要绘制的dom】", this.$refs.poster)
        //let _app = document.getElementById("app")  
        let _poster = document.getElementById("poster")
        //html2canvas(this.$refs.imageWrapper,{
        html2canvas(this.$refs.poster, {
          useCORS: true, // 【重要】开启跨域配置
          allowTaint: true,//允许跨域图片
          // taintTest: false,//是否在渲染前测试图片
          backgroundColor: "#fff",
          logging: false,
          width: _poster.offsetWidth - 1,//设置canvas尺寸与所截图尺寸相同，防止白边
          height: _poster.offsetHeight - 1,//防止白边
          scale: 1.3,
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
    MyHeader
  }
}
</script>

<style scoped>
  .poster{font-size: 0;transition: all .5s;}
  /* .poster.on{background: #333;} */
  /* .poster-box{height: calc(100vh - .92rem);box-sizing: border-box;font-size: 28px;} */
  /* .poster-box .box{width:70%;} */
  /* .poster-box .text{padding:30px;background: #fff;position: relative;z-index: 5;background: green;} */
  /* .poster-box img{width:105%;} */
  /* .poster-box .left{flex:2;font-family: "楷体";} */
  .poster-box .left span{font-size: 20px;color:red;}
  /* .poster-box .right{flex:1;text-align: center;} */
  /* .poster-box .right p{font-size: 36px;padding-bottom: 10px;} */
  /* .poster-box .right img{width:70%;border-radius: 50%;} */
  #poster-img{position: fixed;width:70%;top:50%;left:50%;transform: translate(-50%, -50%);z-index: 100;}
</style>