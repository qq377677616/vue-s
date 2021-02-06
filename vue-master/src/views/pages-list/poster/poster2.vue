<template>
  <div class="body poster" :class="{'on': dataURL}" ref="cutScreen">
    <my-header :title="pageTitle"></my-header>
    <div id="poster-img"><div class="fadeShow" v-show="dataURL"><img class="wobble" :src="dataURL" alt=""></div></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import { loadFonts, canvasImg } from "assets/js/util"

export default {
  name: "",
  data() { 
    return {
      pageTitle: "原生海报",//页面标题
      dataURL: ''//海报地址
    }
  },
  mounted() {
    //加载特殊字体文件后生成海报
    loadFonts('fzxkjw', 'https://img.vrupup.com/web/szq/images/fzxkjw.ttf').then(res => {
      this.canvasInit()
    })
  },
  methods: {
    canvasInit() {
      this.$toast.loading({ message: '海报生成中', forbidClick: true, duration: 0, loadingType: 'spinner' })
      let options = {
        posterSize: [750, 1480],
        bgImg: '',
        imgList: [
          { url: "https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132", imgW: 86, imgH: 86, imgX: 467, imgY: 1074, rotate: -7 },
          { url: "https://img.vrupup.com/web/szq/images/img_32.png", imgW: 750, imgH: 1480, imgX: 0, imgY: 0},
          { url: "https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132", imgW: 86, imgH: 86, imgX: 467, imgY: 1074, radius: "50%", rotate: -7 },
          { url: "https://img.vrupup.com/web/szq/images/img_04.jpg", imgW: 186, imgH: 186, imgX: 20, imgY: 20, radius: 30}
        ],
        textList: [
          { string: "恭喜发财", color: "#C24C4C", style: "bold 40px Arial", textX: 375, textY: 80, textAlign: "center"},
          { string: "“除”去烦恼，吃得香又睡得饱", color: "#52341C", style: "bold 26px fzxkjw", textX: 400, textY: 928, textAlign: "center", rotate: -7 },
          { string: "“除”去烦恼，吃得香又睡得饱", color: "#52341C", style: "bold 26px fzxkjw", textX: 410, textY: 972, textAlign: "center", rotate: -7 },
          { string: "“除”去烦恼，吃得香又睡得饱", color: "#52341C", style: "bold 26px fzxkjw", textX: 420, textY: 1016, textAlign: "center", rotate: -7 },
          { string: "建设银行", color: "#52341C", style: "bold 34px Arial", textX: 570, textY: 1080, textAlign: "left", rotate: -6.5 }
        ] 
      }
      canvasImg(options).then(res => {
        console.log("生成的截屏图片地址为：", res.slice(0, 50))
        this.$toast.clear()
        this.dataURL = res
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  #myCanvas{position: fixed;left:100%;top:0;}
  .poster{font-size: 0;transition: all .5s;}
  .poster.on{background: #333;}
  .poster-box{height: calc(100vh - .92rem);box-sizing: border-box;font-size: .28rem;opacity: 0;}
  .poster-box .box{width:70%;}
  .poster-box .text{padding:.4rem .3rem;background: #fff;margin-top: -1.5rem;position: relative;z-index: 5;}
  .poster-box img{width:105%;}
  .poster-box .left{flex:2;}
  .poster-box .left span{font-size: 20px;color:red;}
  .poster-box .right{flex:1;text-align: center;}
  .poster-box .right p{font-size: .36rem;padding-bottom: .1rem;}
  .poster-box .right img{width:70%;border-radius: 50%;}
  #poster-img{position: fixed;width:70%;top:50%;left:50%;transform: translate(-50%, calc(.46rem - 50%));z-index: 100;}
</style> 