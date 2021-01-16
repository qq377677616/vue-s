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
      pageTitle: "原生海报",
      imgs: require("../../../assets/images/poster_02.png"),
      dataURL: ''
    }
  },
  mounted() {
    this.canvasInit()
  },
  methods: {
    canvasInit() {
      this.$toast.loading({ message: '海报生成中', forbidClick: true, duration: 0 })
      let _this = this
      let options = {
        posterSize: [750, 1480],
        bgImg: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/bg2.png`,
        imgList: [
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/top_bg.png`,
            imgW: 609,
            imgH: 86,
            imgX: 106,
            imgY: 114,
          }, //头部背景
          {
            url: `https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132`,
            imgW: 142,
            imgH: 156,
            imgX: 30,
            imgY: 76,
            radius: "50%"
          }, //头像
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/logo.png`,
            imgW: 177,
            imgH: 56,
            imgX: 537,
            imgY: 29,
          }, //logo
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/box_bg.png`,
            imgW: 750,
            imgH: 1033,
            imgX: 0,
            imgY: 222,
          }, //盒子背景
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/text_info.png?type=1`,
            imgW: 533,
            imgH: 144,
            imgX: 35,
            imgY: 1289,
          }, //底部文案背景
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/gx.png`,
            imgW: 68,
            imgH: 38, 
            imgX: 170,
            imgY: 138,
          }, //底部文案背景
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/icon.png`,
            imgW: 111,
            imgH: 278,
            imgX: 500,
            imgY: 680,
          }, //小金人背景
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/job1.png`,
            imgW: 130,
            imgH: 38,
            imgX: 420,
            imgY: 138,
          },
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/job1.png`,
            imgW: 130,
            imgH: 38,
            imgX: 235,
            imgY: 138,
          },
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/bottom_info1.png`,
            imgW: 662,
            imgH: 184,
            imgX: 38,
            imgY: 975,
          }, //底部信息
          {
            url: `https://img.vrupup.com/web/cdn/wyl/dgr/poster/ma.png`,
            imgW: 128,
            imgH: 144,
            imgX: 590,
            imgY: 1286,
          }, //二维码
        ],
        textList: [ { string: "证书编号TPBJ202000001", color: "#A37582", style: "bold 26px Arial", textX: 352, textY: 64, textAlign: "left" },
                    { string: "张三丰", color: "#ffffff", style: "bold 28px song", textX: 375, textY: 524, textAlign: "center" },
                    { string: '一份份捐赠，如星火燎原之势，点亮孩子的希望，爱润童心，助力成长！特发此证，感恩您的爱心义举！', color: '#60294E', style: "bold 28px song", textAlign: "center", textX: 375, textY: 733, wrap: 12, lineHeight: 50 }
                  ] 
      };
      let options2 = {
        posterSize: [750, 1480],
        // bgImg: 'http://cbg2020.oss-cn-beijing.aliyuncs.com/cbg_cfpa/userhead/image/20200611152446919352.png',
        bgImg: this.imgs,
        imgList: [
          { url: "https://img.vrupup.com/web/szq/images/img_07.png", imgW: 380, imgH: 380, imgX: 180, imgY: 50, radius: "50%" },
          // { url: "https://img.vrupup.com/web/cdn/wyl/dgr/poster/icon.png", imgW: 380, imgH: 380, imgX: 180, imgY: 500},
          { url: "https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132", imgW: 120, imgH: 120, imgX: 50, imgY: 50, radius: "50%" },
        ],
        textList: [ { string: "证书编号TPBJ202000001", color: "#A37582", style: "bold 26px Arial", textX: 352, textY: 64, textAlign: "left" },
                    { string: "张三丰", color: "#ffffff", style: "bold 28px song", textX: 375, textY: 524, textAlign: "center" },
                    { string: '一份份捐赠，如星火燎原之势，点亮孩子的希望，爱润童心，助力成长！特发此证，感恩您的爱心义举！', color: '#60294E', style: "bold 28px song", textAlign: "center", textX: 375, textY: 733, wrap: 12, lineHeight: 50 }
                  ] 
      }
      canvasImg(options).then(res => {
        console.log("生成的截屏图片地址为：")
        console.log(res.slice(0, 50))
        this.$toast.clear()
        _this.dataURL = res
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  /* @font-face { 
    font-family: "jl";
    src: url('https://img.vrupup.com/web/szq/images/jl.ttf')
  } */
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