<template>
  <div class="body">
    <div class="con flex-cen">我的</div>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Baes64 from "assets/js/Base64.js"
console.log("Baes64", Baes64)
import Tab from 'components/tab.vue'
import api from 'api/api'
export default {
  name: "",
  data() {
    return {
      
    }
  },
  created() {
    // api.getPostTest({ code: 'dsf4asdf465asd' }).then(res => {
    //   console.log("[请求成功]", res)
    // })
  },
  components: {
    Tab
  }
}
</script>

<style scoped>
  .body{padding-bottom: 1rem;background: linear-gradient(135deg,#fff 0%, #977924 100%);}
  .body,.con{height:100%;font-size:.6rem;font-style:italic;color:#000;}
</style>