<template>
  <div class="body">
    <div class="full-screen">
      <div class="haze">
        <img class="arrow" src="../assets/images/arrow.png" alt="">
        <p>点击“ ··· ”,请在safari中浏览器打开</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
export default {
  name: "",
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  .haze .arrow{position: absolute;right:20px;top:10px;}
  .haze p{margin-top: 140px;font-size: .4rem;text-align: center;}
</style>