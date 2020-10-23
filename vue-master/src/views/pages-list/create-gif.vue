<template>
  <div class="body">
    <!-- <my-header :title="pageTitle"></my-header> -->
    <div class="con full-screen flex-cen-col">
      <div class="top flex-cen">
        <img :src="item" alt="" v-for="(item, index) in imgList" :key="'key' + index">
      </div>
      <button :class="{'dis': gifUrl}" @click="compose">一键合成gif</button>
      <div class="bottoms">
        <img :src="gifUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import gifshot from 'assets/js/gifshot.min.js'
export default {
  name: "create-gif",
  data() {
    return {
      pageTitle: "合成gif图",
      imgList: ['https://img.vrupup.com/web/szq/images/avatar_01.png', 'https://img.vrupup.com/web/szq/images/avatar_02.png', 'https://img.vrupup.com/web/szq/images/avatar_03.png', 'https://img.vrupup.com/web/szq/images/avatar_04.png'],
      gifUrl: ''
    }
  },
  methods: {
    compose() {
      if (this.gifUrl) return
      this.$toast.loading({ message: "合成中", duration: 0, loadingType: "spinner" })
      gifshot.createGIF({
        'interval': .7,//gif速率
        'gifWidth': 200,//gif宽    
        'gifHeight': 200,//gif高
        'images': this.imgList//图片列表
      }, obj => {
        if (!obj.error) {
          this.$toast.clear()
          this.$toast("合成完成")
          var image = obj.image
          this.gifUrl = image
        }
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .body{background: #eee;}
  .con{text-align: center;}
  .top img{width:22%;margin:0 1%;}
  .bottom img{width:40%;}
  button{width:30%;height:.6rem;background: #1AAD19;font-size: .3rem;color:#fff;border-radius: .1rem;margin:.4rem 0;}
  button.dis{background: #ccc;}
</style>