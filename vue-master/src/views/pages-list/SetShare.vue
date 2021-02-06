<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen-col">
      <van-button type="primary" @click="getShareData">设置分享</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { shareConfigure } from "assets/js/wx.config"
import { AUTH_URL, SHARECONFIG } from "api/project.config"
import { getRandomNum } from 'assets/js/util'
import api from "api/api"
export default {
  name: "",
  data() {
    return {
      pageTitle: "动态设置分享",//页面标题
      codeList: [//核弹码列表
        'H2VLRYEnvFGEeg79P5B',
        'UwqUL90oFN2n5LI15D9',
        'dErClSijvpVnba4jADH',
        'FrPvpBKGom8WPyxdU9n',
        'SEHqQbYZqxFMFzuclsg',
        'X6V0nuuuAuUxCqQFkoM',
        'zu1DTauO3CW9dWkjKqr',
        'bTPO8Cuo5lcd1zQXdU7',
        'KPQNwbXzQbxLBjX50Zr',
        'YaBP9JYSzS3a0TxkYMa'
      ]
    }
  },
  methods: {
    //获取分享数据（测试用）
    getShareData() {
      this.$toast.loading({ message: '', forbidClick: true, duration: 0, loadingType: 'spinner' })
      api.getProjectConfig({ code: this.codeList[getRandomNum(0, this.codeList.length - 1)] }).then(res => {
        let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
        let _shareData = {
          Title: `[测]${_data.shareTitle}`, //分享标题
          ShareUrl: `${AUTH_URL}?id=123456`,//分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          Desc: _data.shareContent,//分享描述
          ShareImage: _data.shareImg//分享图标
        }
        this.setShareConfigure(_shareData)
      })
    },
    //动态分享配置（当project.config配置文件SHARECONFIG.type设置为1时才会进入回调,如果要监听用户点击分享按钮请传入this）
    setShareConfigure(shareData) {
      shareConfigure(shareData, this).then(res => {//分享配置成功回调
        console.log("【重置分享成功】", res)
      }).catch(err => {//分享配置失败回调
        this.$toast("动态设置分享失败")
        console.log("【重置分享失败】", err)
      })
      this.$toast.clear()
      if (!SHARECONFIG.type) this.$toast("重置设置分享成功")
    },
    //用户点击分享按钮回调(需shareConfigure方法中传入this,才能生效)
    clickShareButtonCallback(e) {
      console.log("【在当前组件中点击分享回调】", e)
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>

</style>