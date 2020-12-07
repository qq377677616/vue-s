<template>
  <div class="body poster" :class="{'on': dataURL}" ref="cutScreen">
    <my-header :title="pageTitle"></my-header>
    <div id="poster-img"><div class="fadeShow" v-show="dataURL"><img class="wobble" :src="dataURL" alt=""></div></div>
    <canvas id="myCanvas" style="width: 750px;height: 1480px;opacity:0;"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import { canvasImg } from "assets/js/util"
import { Toast } from 'vant'
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
    setTimeout(() => {
      this.canvasInit()
    }, 1000)
  },
  methods: {
    canvasInit() {
      Toast.loading({ message: '海报生成中', forbidClick: true, duration: 0 })
      let _this = this;
      let options = {
        canvasId: "myCanvas",
        psd_w: 750,
        psd_h: 1480,
        // bgImg: 'http://cbg2020.oss-cn-beijing.aliyuncs.com/cbg_cfpa/userhead/image/20200611152446919352.png',
        bgImg: this.imgs,
        imgList: [
          // { url: "https://img.vrupup.com/web/szq/images/img_07.png", imgW: 380, imgH: 380, imgX: 180, imgY: 50, radius: "50%" },
          // { url: "https://img.vrupup.com/web/szq/images/img_08.png", imgW: 380, imgH: 380, imgX: 180, imgY: 500, radius: "50%" },
          { url: "https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132", imgW: 120, imgH: 120, imgX: 50, imgY: 50, radius: "50%" },
          // { url: "https://img.vrupup.com/web/szq/images/img_04.jpg", imgW: 400, imgH: 742, imgX: 180, imgY: 120},
          // { url: "https://img.vrupup.com/web/szq/images/img_06.jpg", imgW: 400, imgH: 400, imgX: 180, imgY: 1020}
          // { url: "https://img.vrupup.com/web/szq/images/img_04s.png", imgW: 400, imgH: 400, imgX: 180, imgY: 320},
          // { url: "https://img.vrupup.com/web/szq/images/img_06s.png", imgW: 400, imgH: 400, imgX: 180, imgY: 820}
        ],
        textList: [ { string: "证书编号TPBJ202000001", color: "#A37582", style: "bold 26px Arial", textX: 352, textY: 64, textAlign: "left" },
                    { string: "张三丰", color: "#ffffff", style: "bold 28px Arial", textX: 375, textY: 524, textAlign: "center" },
                    { string: '一份份捐赠，如星火燎原之势，点亮孩子的希望，爱润童心，助力成长！特发此证，感恩您的爱心义举！', color: '#60294E', style: "bold 28px Arial", textAlign: "center", textX: 375, textY: 733, wrap: 12, lineHeight: 50 }
                  ]
      }
      canvasImg(options).then(res => {
        console.log("生成的截屏图片地址为：")
        console.log(res.slice(0, 50))
        Toast.clear()
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