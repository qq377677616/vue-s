<template>
  <div class="body index">
    <div class="con flex-cen"><p>vue</p><span>0116</span></div>
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
      percentNum: 0
    }
  },
  methods: {
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
  .index{background:linear-gradient(135deg,#027C60 0%, #A8271E 100%);padding-bottom: 1rem;box-sizing: border-box;}
  .body, .con{height:100%;font-size:.8rem;font-style:italic;color:#fff;}
  span{font-size: 12px;padding-left: 10px;}
</style>