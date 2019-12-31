<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="con full-screen flex-cen-col">
      <div class="top flex">
        <img :src="item" alt="" v-for="(item, index) in imgList" :key="'key' + index">
      </div>
      <button :class="{'dis': gifUrl}" @click="compose">一键合成</button>
      <div class="bottom">
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
      imgList: ['https://game.flyh5.cn/resources/game/wechat/szq/images/img_09.jpg', 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_10.jpg', 'https://game.flyh5.cn/resources/game/wechat/szq/images/img_11.jpg'],
      gifUrl: ''
    }
  },
  methods: {
    compose() {
      if (this.gifUrl) return
      this.$toast.loading({ message: "合成中", duration: 0, loadingType: "spinner" })
      gifshot.createGIF({
        'interval': .7,//gif速率
        'gifWidth': 601,//gif宽    
        'gifHeight': 805,//gif高
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
  .con{text-align: center;}
  .top img{width:30%;margin:0 1%;}
  .bottom img{width:40%;}
  button{width:30%;height:.6rem;background: #1AAD19;font-size: .3rem;color:#fff;border-radius: .1rem;margin:.4rem 0;}
  button.dis{background: #ccc;}
</style>