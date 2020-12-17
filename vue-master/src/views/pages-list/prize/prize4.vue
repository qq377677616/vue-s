<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen">
        <vue-scratch-card ref="vueScratchcard" :element-id=scratchCardOption.elementId :ratio=scratchCardOption.range :move-radius=scratchCardOption.thickness :start-callback=startCallback :clear-callback=clearCallback :cover-img=scratchCardOption.coverImg :cover-color=scratchCardOption.coverColor :result-img=scratchCardOption.resultImg />
      </div>
    </div>
  </div>
</template>

<script type="span/ecmascript-6">
import Vue from 'vue'
import MyHeader from 'components/header.vue'
import ScratchCard from 'vue-scratch-card0'
Vue.use(ScratchCard)

export default {
  name: "",
  data() {
    return {
      pageTitle: "刮刮乐",
      scratchCardOption: {//刮刮乐选项配置
        elementId: 'my-scratch-card',//刮刮乐盒子id
        range: 0.5,//刮奖阀值
        thickness: 10,//触摸粗细度
        coverColor: "#ddd",//刮刮卡遮罩颜色
        coverImg: "https://img.vrupup.com/web/szq/images/img_23.jpg",//刮刮卡遮罩图片
        resultImg: "https://img.vrupup.com/web/szq/images/img_22.jpg",//奖品图片
      }
    }
  },
  created() {

  },
  methods: {
    //开始刮奖回调
    startCallback(){
      console.log('开始刮奖')
    },
    //刮完奖回调
    clearCallback(){
      this.$dialog.alert({ title: '中奖结果', message: "恭喜您刮中100元现金" }).then(() => {
        this.$toast.loading({ message: "刮刮乐重置中", duration: 0 })
        setTimeout(() => {
          this.$refs.vueScratchcard.init()
          this.$toast.clear()
          this.$toast("重置成功")
        }, 800)
      }) 
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  #my-scratch-card{width:5.664rem !important;height:3.504rem !important;}
</style>