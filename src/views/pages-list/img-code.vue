<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen">
      <div class="code">
        <div class="flex-cen box">
          <input type="text" v-model="inputValue" placeholder="请输入验证码" maxlength="4" />
          <div style='position:relative;' @click="refreshCode" class="img-code">
            <img-code ref="imgCode" :identifyCode="identifyCode"></img-code>
          </div>
        </div>
        <div @click="verification" class="btn">点击验证</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ImgCode from 'base/img-code.vue'
import MyHeader from "components/header.vue"
import { Toast } from 'vant'
export default {
  name: "",
  data() {
    return {
      pageTitle: "图片验证码",
      identifyCode: '',
      inputValue: ''
    }
  },
  mounted() {
    this.refreshCode()
    // setInterval(() => {
    //   this.refreshCode()
    // }, 1000)
  },
  methods: {
    verification() {
      if (this.inputValue == this.identifyCode) {
        this.$dialog.alert({ title: "验证成功", message: "图片验证码验证成功" }) .then(() => {
          Toast.loading({ message: '重置中', forbidClick: true, duration: 0 })
          setTimeout(() => { 
            this.inputValue = ''
            this.refreshCode()
            Toast.clear()
          }, 800)
        })
      } else {
        this.$toast("验证码输入有误")
      }
    },
    refreshCode() {
      this.identifyCode = this.$refs.imgCode.randomNum(1000, 9999)
      this.$refs.imgCode.drawPic()
    }
  },
  components: {
    MyHeader,
    ImgCode
  }
}
</script>

<style scoped>
  .code,.box{width:100%;}
  .code input{border:1px solid #999;width:2rem;height:.7rem;margin-right: .2rem;padding-left: .1rem;}
  .img-code canvas{width:1.6rem;height:.7rem;border:1px solid #999;}
  .btn{width:4.6rem;margin:.4rem auto;border:1px solid #aaa;height:.7rem;line-height: .7rem;text-align: center;border-radius: .1rem;color:#333;}
</style>