<template>
  <div class="body">
    <!-- <my-header :title="pageTitle"></my-header> -->
    <div class="contant">
      <div class="preinstall flex-cen">
        <div class="item flex-cen" :class="{ 'on': item.selected }" v-for="item in preinstall" :style="{background: item.rgb}" :key="item.name">
          <span>✓</span>
        </div> 
      </div>
      <div class="img-box"><img class="view-image" :style="{opacity: imgUrl ? 1 : 0}" ref="viewImg" :src="imgUrl" mode="aspectFit" @load="distinguish" /></div> 
      <canvas id="myCanvas" :style="{width: canvasW + 'px', height: canvasH + 'px'}"></canvas>
      <button class="btn" :class="{'on': allLight}" @click="selectImg">{{imgUrl ? (allLight ? '已全部点亮' : '继续点亮') : '我要点亮'}}</button>
      <div class="ul">
        <div class="li flex-cen" v-for="(item, index) in colorLists" :key="item.rgb + index">
          <div class="pro">{{item.pro}}</div>
          <div class="block" :style="{background: item.color}"></div>
          <div class="color-val">{{item.color}}</div>
          <div class="color-val">{{item.rgb}}</div>
        </div>
      </div>
      <input hidden type="file" multiple id="file" ref="file" accept="image/*" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { colorHex, colorRgb, rgbaToHsv, triggerEvent } from 'assets/js/util'
export default {
  name: "",
  data() {
    return {
      pageTitle: "色值智能识别",
      preinstall: [//预设色值
        { name: '紫色', rgb: 'rgb(125,2,243)' }, 
        { name: '棕色', rgb: 'rgb(109,35,2)' }, 
        { name: '绿色', rgb: 'rgb(38,179,38)' }, 
        { name: '青色', rgb: 'rgb(2,180,216)' }, 
        { name: '红色', rgb: 'rgb(169,22,42)' }
      ],
      canvasId: 'myCanvas',//canvas的canvas-id
      sizeLimit: [500, 500],//识别照片最小宽高
      isMultiple: true,//同一张照片是否识别多个色值
      frontValue: 80,//识别前面几个色值相似度
      rangeValue: 200,//识别精度--固定距离
      rangeValues: 20,//识别精度--固定次数
      threshold_rgb_v: 2000,//色值相似度阀值
      threshold_rgb: 0.65,//色值相似度阀值
      threshold_hsv: 75,//色值相似度阀值
      // imgUrl: "https://img.vrupup.com/web/szq/images/img_19.png",//待识别图片路径
      // imgUrl: "https://img.vrupup.com/web/szq/images/img_21.jpg",//待识别图片路径
      imgUrl: '',//待识别图片地址
      canvasW: '',//canvas宽
      canvasH: '',//canvas高
      allLight: false,//是否全部点亮
      colorLists: []//识别的颜色值
    }
  },
  mounted() {
    // this.distinguish()
    console.log(document.getElementById("app"))
    document.getElementById("app").style.position = 'initial'
    console.log(window.innerWidth, window.innerHeight)
  },
  methods: {
    //开始识别
    distinguish() {
      this.$toast.loading({ message: '智能识别中', forbidClick: true, duration: 0 })
      let { imgUrl, sizeLimit } = this
      this.getImageInfo(imgUrl).then(res => {
        console.log("res", res)
        if (res.width < sizeLimit[0] || res.height < sizeLimit[1]) {
          this.$toast.clear()
          this.$toast("图片过小", `请上传尺寸大于${sizeLimit[0]} * ${sizeLimit[1]}的图片`, false)
          return
        }
        // this.canvasW = res.width
        // this.canvasH = res.height
        // let _ratio = 1
        // if (res.width > 4000 || res.height > 4000) {
        //   _ratio = (Math.max(res.width / 4000, res.height / 4000))
        // }
        // console.log("_ratio", _ratio)
        var canvas = document.getElementById(this.canvasId)
        var ctx = canvas.getContext("2d")
        var devicePixelRatio = window.devicePixelRatio || 1
        var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1
        var ratio = devicePixelRatio / backingStoreRatio
        // console.log("canvas大小", res.width * ratio, res.height * ratio)
        // console.log("canvas大小2", (res.width * ratio) / _ratio, (res.height * ratio) / _ratio)
        canvas.width = (res.width * ratio) / 2
        canvas.height = (res.height * ratio) / 2
        ctx.scale(ratio / 2, ratio / 2)
        console.log("ratioratio", ratio)
        // canvas.width = (res.width * ratio) / _ratio
        // canvas.height = (res.height * ratio) / _ratio
        ctx.drawImage(res.img, 0, 0, res.width, res.height, 0, 0, res.width, res.height)
        // ctx.drawImage(res.img, 0, 0, res.width / _ratio, res.height / _ratio, 0, 0, res.width / _ratio, res.height / _ratio)
        setTimeout(() => {
          this.getColorValue('myCanvas', res.width, res.height)
        }, 500)
      })
    },
    //获取图片宽高
    getImageInfo(imgUrl) {
      return new Promise(resolve => {
        let _img = new Image()
        _img.setAttribute("crossOrigin", "anonymous")
        _img.src = imgUrl
        _img.onload = () => {
          resolve({ img: _img, width: _img.width, height: _img.height })
        }
      })
    },
    //选择图片
    selectImg(e) {
      console.log("点击了选择图片")
      if (this.preinstall.every(item => item.selected)) {
        this.$toast("您已全部点亮")
        return
      }
      let _this = this
      let file = this.$refs.file
      e.target.dataset.type != 0 && (this.curType = e.target.dataset.type)
      file.value = ''
      triggerEvent(file)
      file.addEventListener("change", function() {
        _this.imgUrl = _this.getObjectURL(this.files[0])
        console.log("本地预览", _this.getObjectURL(this.files[0]).slice(0, 50))
      });
    },
    //获取本地预览图片
    getObjectURL(file) {
      console.log("file", file)
      var url = null
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url;
    },
    //识别色值
    async getColorValue(canvasId, canvasW, canvasH) {
      let colorList = [], colorLists = [], totalColorVal = 0, { rangeValues, rangeValue, frontValue } = this
      let deviation_w = Math.ceil(canvasW / rangeValues)
      let deviation_h = Math.ceil(canvasH / rangeValues)
      for (let i = 0; i < canvasW; i += deviation_w) {
        for (let j = 0; j < canvasH; j += deviation_h) {
          // console.log("i,j",i, j)
          let imgData = await this.canvasGetImageData(canvasId, i, j, rangeValue, rangeValue)
          colorList.push(colorHex(`rgb(${imgData.data[0]},${imgData.data[1]},${imgData.data[2]})`));
        }
      }
      colorList = colorList.reduce((prev, cur) => {
        if (cur in prev) {
          prev[cur]++
        } else {
          prev[cur] = 1
        }
        return prev
      }, {})
      console.log("【十六进制颜色码1】", colorList)
      for (let v in colorList) {
        if (v !== 'undefined') {
          totalColorVal += colorList[v]
          colorLists.push({ color: v, rgb: colorRgb(v), num: colorList[v] })
        }
      }
      colorLists.forEach((item, index) => { colorLists[index].pro = `${(item.num * 100 / totalColorVal).toFixed(2)}%` })
      colorLists.sort((a, b) => (b.num - a.num) )
      console.log("【十六进制颜色码2】", colorLists, totalColorVal)
      this.colorLists = colorLists.slice(0, frontValue)
      this.calcAcquaintance(colorLists)
    },
    //计算色值相似度
    calcAcquaintance(colorLists) {
      let { frontValue, preinstall, threshold_rgb_v, threshold_rgb, threshold_hsv } = this, _discriminateOkList = []
      for (let j = 0; j < Math.min(colorLists.length, frontValue); j++) {
        for (let i = 0; i < preinstall.length; i++) {
          if (preinstall[i].selected) continue
          console.log(`与${preinstall[i].name}相似度`, `${parseInt(this.distanceOf(rgbaToHsv(preinstall[i].rgb), rgbaToHsv(colorLists[j].rgb)))}%`)
          if (this.distanceOf(rgbaToHsv(preinstall[i].rgb), rgbaToHsv(colorLists[j].rgb)) > threshold_hsv) {//hsv对比
            preinstall[i].selected = true
            this.preinstall =  preinstall
            this.$toast.clear()
            _discriminateOkList.push(preinstall[i].name)
            // Dialog.alert({ title: '点亮成功', message: `恭喜您，点亮了${preinstall[i].name}` })
            // if (preinstall.every(item => item.selected)) {
            //   this.allLight = true
            //   Dialog.alert({ title: '全部点亮', message: '恭喜您已全部点亮，赶快去领奖吧~' })
            // }
            // return         
          }
        }
      }
      this.$toast.clear()
      if (_discriminateOkList.length) {
        console.log("_discriminateOkList", _discriminateOkList)
        let _msg = ''
        _discriminateOkList.forEach((item, index) => {
          _msg += `${index > 0 ? '、' : ''}${item}`
        })
        this.$dialog.alert({ title: '点亮成功', message: `恭喜您点亮了${_msg}` }).then(() => {
          setTimeout(() => {
            if (preinstall.every(item => item.selected)) {
              this.allLight = true
              this.$dialog.alert({ title: '全部点亮', message: '恭喜您已全部点亮，赶快去领奖吧~' })
            }
          }, 300)
        })
      } else {
        this.$dialog.alert({ title: '点亮失败', message: "您拍摄/上传的照片中没有对应的logo色或已点亮过，请重新拍摄/上传再来点亮吧~" })
      }
    },
    //色值相似度--rgb
    calcColorAcquaintance(rgb1, rgb2) {
      let _r, _g, _b, diff
      rgb1 = rgb1.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
      rgb2 = rgb2.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
      _r = (rgb1[0] - rgb2[0]) / 256
      _g = (rgb1[1] - rgb2[1]) / 256
      _b = (rgb1[2] - rgb2[2]) / 256
      diff = Math.sqrt(_r * _r + _g * _g + _b * _b) / Math.sqrt(255 * 255 * 3)
      console.log("diff", diff)
      return diff
    },
    distance(rgb1, rgb2){
        let degree
        rgb1 = rgb1.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
        rgb2 = rgb2.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
        degree = Math.pow(rgb1[0] - rgb2[0], 2) + Math.pow(rgb1[1] - rgb2[1], 2) + Math.pow(rgb1[2] - rgb2[2], 2)
        return degree
      },
    //色值相似度--hsv
    distanceOf(hsv1, hsv2) {
      var r = 100, angle = 30, h = r * Math.cos(angle / 180 * Math.PI), r = r * Math.sin(angle / 180 * Math.PI);
      var x1 = r * hsv1[2] * hsv1[1] * Math.cos(hsv1[0] / 180 * Math.PI);
      var y1 = r * hsv1[2] * hsv1[1] * Math.sin(hsv1[0] / 180 * Math.PI);
      var z1 = h * (1 - hsv1[2]);
      var x2 = r * hsv2[2] * hsv2[1] * Math.cos(hsv2[0] / 180 * Math.PI);
      var y2 = r * hsv2[2] * hsv2[1] * Math.sin(hsv2[0] / 180 * Math.PI);
      var z2 = h * (1 - hsv2[2]);
      var dx = x1 - x2;
      var dy = y1 - y2;
      var dz = z1 - z2;
      return 100 - Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    //获取 canvas 区域隐含的像素数据
    canvasGetImageData(canvasId, x, y, rw, rh) {
      return new Promise(resolve => {
        let ctx = document.getElementById(canvasId).getContext('2d')
        resolve(ctx.getImageData(x, y, rw, rh))
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  #myCanvas{position: fixed;left:105%;top:0;}
  .ul{padding-bottom:1rem;text-align: center;}
  .ul .li{margin:.2rem 0;padding:0 .6rem;font-size: .3rem;}
  .ul .li .pro{width:1.3rem;}
  .ul .li .block{width:.4rem;height: .4rem;border:1px solid #bbb;}
  .color-val{flex:1;}
  .img-box{border:1px solid #eee;width:6rem;height: 6rem;margin:.5rem auto;background:#eee;}
  .view-image{display: block;object-fit: contain;width: 100%;height: 100%;}
  .preinstall{padding-top: .5rem;}
  .preinstall .item{width:1rem;height: 1rem;margin:0 .2rem;}
  .preinstall .item span{opacity: 0;color:#fff;font-size:.6rem;}
  .preinstall .item.on span{opacity: 1;}
  .btn{width:2rem;height: .8rem;border-radius: .1rem;color:#fff !important;font-size: .3rem;display: block;margin: 0 auto .5rem;background: #027C60;}
  .btn.on{background: #DD4F43;}
</style>