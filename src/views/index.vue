<template>
  <div class="body index">
    <ul>
      <li v-for="(item, index) in jumpList" :class="{'dis': !item.url}" :key="'key' + index" @click="jump(index)">{{item.name}}</li>
    </ul>
    <tab></tab> 
  </div>
</template>

<script>
import Tab from 'components/tab.vue'
export default {
  name: 'index',
  data() {
    return {
      name: "这是一个有点长的又不是很长的昵称 ",
      names: '',
      jumpList: [
        { name: "自由拖拽", url: "/drag" },
        { name: "拖拽排序", url: "/list-sort" },
        { name: "原生上传", url: "/upload" },
        { name: "图片裁剪", url: "/cropper" },
        { name: "触摸事件", url: "/vue-event" },
        { name: "生成海报", url: "/poster" },
        { name: "生成二维码", url: "/code" },
        { name: "省市区日期选择", url: "/picker" },
        // { name: "中英文切换", url: "" },
        { name: "合成gif动图", url: "/create-gif" },
        // { name: "charts图表", url: "" },
        // { name: "数字滚动", url: "" },
        { name: "抽奖系列", url: "/prize" },
        { name: "地图", url: "/map" },
        { name: "A~Z索引滚动列表", url: "/mail-list" },
        { name: "vuex", url: "/vuex" },
        { name: "下一版本见...", url: "" }
      ]
    }
  },
  created() {

  },
  methods: {
    jump(index) {
      if (!this.jumpList[index].url) return
      // sessionStorage.setItem('prevPage', this.jumpList[index].url)
      this.$router.replace(this.jumpList[index].url)
    }
  },
  computed: {
  },
  components: {
    Tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p.name{width:4.2em;margin:.2rem auto;border:1px solid green;}
  .index{background:linear-gradient(135deg,#027C60 0%, #A8271E 100%);padding-bottom: 1rem;box-sizing: border-box;}
  ul{height: calc(90vh - 1rem);overflow: auto;-webkit-overflow-scrolling:touch;}
  ul li{width:2.5rem;height:.5rem;line-height: .5rem;text-align: center;border:1px solid #ddd;border-radius: .1rem;margin:.2rem auto;background: #fff;font-size: .28rem;}
  ul li.dis{color:#bbb;}
</style>
