<template>
  <div class="pro" :class="{'on': isOk}" v-if="isShow">
    <div class="flex-cen">
      <div class="pro-box">
        <div class="img">
          <img src="../assets/images/logo_vue.png" alt="">
          <div class="box" :style="{'height': pro + '%'}"><img src="../assets/images/logo_vue.png" alt=""></div>
        </div>
        <div class="num">{{pro}}%</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: "",
  props: {
    pageLoadingOk: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOk: false,
      isShow: true,
      pro: 1,
      speed: 150,
    }
  },
  created() {
    this.pageProgress(() => {
      this.isOk = true
      setTimeout(() => { this.isShow = false }, 500)
      this.$emit("loadingOk")
    })
  },
  methods: {
    pageProgress(callback) {
      setTimeout(() => {
        if (this.pageLoadingOk) {
          this.speed = 30
          if (this.pro >= 100) {
            this.speed = 9999
            callback()
          }
        } else if (this.pro == 99) {
          this.speed = 500
        } else if (this.pro == 95) {
          this.speed += 6000
        } else if (this.pro == 90) {
          this.speed += 1200
        } else if (this.pro == 75) {
          this.speed += 500
        } else if (this.pro == 50) {
          this.speed += 150
        }
        if (!this.pageLoadingOk || (this.pageLoadingOk && (this.pro == 99 || this.speed == 30))) {
          if ((!this.pageLoadingOk && this.pro < 99) || (this.pageLoadingOk && (this.pro == 99 || this.speed == 30))) this.pro++
          this.pageProgress(callback)
        }
      }, this.speed)
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .pro{z-index: 99999;position: fixed;left:0;top:0;width: 100vw;height: 100vh;text-align: center;}
  .pro::before,.pro::after{content:"";display: block;width: 50%;height: 100%;background: linear-gradient(0, #F28F29 0, #027C60 100%);left:0;top:0;position: absolute;}
  .pro.on::before{transform: translateX(-100%);}
  .pro.on::after{transform: translateX(100%);}
  .pro::after{left:50%;}
  .img{width:2rem;margin:0 auto;position: relative;font-size: 0;}
  .img>img{filter: grayscale(100%);}
  .img .box{position: absolute;overflow: hidden;width: 100%;left:0;bottom:0;}
  .img .box img{width: 2rem;max-width: 2rem;position: absolute;left:0;bottom:0;}
  .num{font-style: italic;font-size: .4rem;color:#fff;padding-top: 0.2rem;}
  .pro-box,.pro::before,.pro::after{transition: all .5s;}
  .pro-box{position: relative;z-index: 5;}
  .pro.on .pro-box{transform: scale(0);opacity: 0;}
  .pro>div{position: absolute;width: 100%;height: 100%;z-index: 1;}
</style>