<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen-col">
      <van-button type="primary" @click="payment('v2')">微信支付v2</van-button>
      <van-button type="info" @click="payment('v3')">微信支付v3</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { weChatPayV2, weChatPayV3 } from "assets/js/util"
import api from "api/api"
export default {
  name: "",
  data() {
    return {
      pageTitle: "微信支付"//页面标题
    }
  },
  methods: {
    //微信支付--获取支付相关参数
    payment(type) {
      this.$toast.loading({ message: '微信支付中', forbidClick: true, duration: 0, loadingType: 'spinner' })
      let _data = {
        param: '16895179862944f944bb0ddcf58d347f',
        goods_id: '42',
        goods_nums: 1,
        address_id: '湖南长沙'
      }
      api.payment(_data).then(res => {
        console.log("【调用支付接口返回成功】", res)
        if (res.status == 200) {
          let { pay_param } = res.data.data
          this.paymentData = {
            appId: pay_param.appId,
            timeStamp: pay_param.timeStamp,
            nonceStr: pay_param.nonceStr,
            package: pay_param.package,
            signType: pay_param.signType,
            paySign: pay_param.paySign
          }
          this.weChatPay(type)
        } else {
           this.$toast.clear()
           this.$toast(res.data.msg)
        }
      }).catch(err => {
        console.log("【调用支付接口返回失败】", err)
        this.$toast("支付失败，请稍后再试")
      })
    },
    //微信支付--调用支付方法
    weChatPay(type) {
      //v2版本
      if (type == 'v2') {
        weChatPayV2(this.paymentData).then(res => {
          console.log("resres", res)
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            console.log("【v2支付成功】", res)  
            this.$toast.success("支付成功")
          } else {
            console.log("【v2支付失败】", res)
            this.$toast.fail("支付失败")
          } 
        })
      } else {
        //v3版本  
        weChatPayV3(this.paymentData).then(res => {
          console.log("【v3支付成功】", res)
          this.$toast.success("支付成功")
        }).catch(err => {
          console.log("【v3支付失败】", err)
          this.$toast.fail("支付失败")
        })
      }
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  button{margin:.2rem 0;}
</style>