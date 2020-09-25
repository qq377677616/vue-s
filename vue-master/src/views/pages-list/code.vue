<template>
  <div class="code body">
    <My-Header :title="pageTitle"></My-Header>
    <div class="full-screen flex-cen">
      <vue-qr :text="downloadData.url" :margin="downloadData.margin" :colorDark="downloadData.colorDark" :colorLight="downloadData.colorLight" :logoSrc="downloadData.icon + '?cache'" :logoScale="downloadData.logoScale" :size="downloadData.size"></vue-qr>
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import vueQr from 'vue-qr'
export default {
  name: "",
  data() {
    return {
      pageTitle: "生成二维码",
      downloadData: {
        url: "https://www.baidu.com",//链接地址
        size: 200,//二维码大小，单位px
        margin: 10,//二维码外边距
        colorDark: "#000",//主色
        colorLight: "#fff",//线条色
        //icon: "http://game.flyh5.cn/resources/game/wechat/szq/images/img_13.jpg",//中间logo图片
        logoScale: 0.2//中间logo图片缩放大小，建议不要太大，不然二维码识别不出来
      }
    }
  },
  components: {
    MyHeader,
    vueQr
  }
}
</script>

<style scoped>
  .code{background: #ddd;}
</style>