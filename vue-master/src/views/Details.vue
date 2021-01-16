<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <p @click="jump()">这是文章详情</p>
     
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
export default {
  name: "",
  data() {
    return {
      pageTitle: "列表页"
    }
  },
  methods: {
    jump() {
      this.$router.go(-1);
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>

</style>