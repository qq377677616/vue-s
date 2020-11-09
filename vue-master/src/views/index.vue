<template>
  <div class="body index">
    <scroll class="ul">
      <ul>
        <li v-for="(item, index) in jumpList" :class="{'dis': !item.url}" :key="'key' + index" @click="jump(index)">{{item.name}}</li>
      </ul>
    </scroll>
    <tab></tab> 
  </div>
</template>

<script>
import Tab from 'components/tab.vue'
import Scroll from 'base/scroll/scroll.vue'
export default {
  name: 'index',
  data() {
    return {
      name: "首页",
      percentNum: 0,
      jumpList: [
        { name: "自由拖拽", url: "/drag" },
        { name: "拖拽排序", url: "/list-sort" },
        { name: "文件上传", url: "/upload" },
        { name: "图片裁剪", url: "/cropper" },
        { name: "触摸事件", url: "/vue-event" },
        { name: "生成海报", url: "/poster" },
        { name: "滑动淡出", url: "/scroll-show" },
        { name: "生成二维码", url: "/code" },
        { name: "省市区日期选择", url: "/picker" },
        { name: "图片验证码", url: "/img-code" },
        { name: "合成gif动图", url: "/create-gif" },
        { name: "序列帧", url: "/sequence" },
        // { name: "charts图表", url: "" },
        // { name: "数字滚动", url: "" },
        { name: "抽奖系列", url: "/prize" },
        { name: "地图", url: "/map" },
        { name: "索引列表", url: "/mail-list" },
        { name: "vuex", url: "/vuex" },
        { name: "多语言", url: "/lang" },
        { name: "直播流", url: "/live" },
        { name: "弹幕", url: "/baberrage" },
        { name: "krpano全景", url: "/krpano" },
        { name: "360全景", url: "/panorama360" },
        { name: "视频插件", url: "/live" },
        { name: "three.js", url: "/three" }
      ]
    }
  },
  methods: {
    //跳转
    jump(index) {
      if (!this.jumpList[index].url) return
      // sessionStorage.setItem('prevPage', this.jumpList[index].url)
      this.$router.replace(this.jumpList[index].url)
    }
  },
  components: {
    Tab,
    Scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p.name{width:4.2em;margin:.2rem auto;border:1px solid green;}
  .index{background:linear-gradient(135deg,#027C60 0%, #A8271E 100%);padding-bottom: 1rem;box-sizing: border-box;}
  .ul{height: calc(100vh - 2.84rem);overflow: hidden;}
  ul li{width:2.5rem;height:.5rem;line-height: .5rem;text-align: center;border:1px solid #ddd;border-radius: .1rem;margin:0 auto .15rem;background: #fff;font-size: .28rem;}
  ul li.dis{color:#bbb;}
</style>
