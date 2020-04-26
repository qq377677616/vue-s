<template>
  <div class="body cropper">
    <My-Header :title="pageTitle"></My-Header>
    <div class="con-box">
      <dl class="item-list">
        <dd v-for="(item, index) in jump_list" :key="'key'+index" @click="jump(index)">{{item.name}}</dd>
      </dl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
export default {
  name: "",
  data() {
    return {
      pageTitle: '图片裁剪',
      jump_list: [
        { name: "图片裁剪1", url: "/cropper/cropper1"},
        { name: "图片裁剪2", url: "/cropper/cropper2"}
      ]
    }
  },
  methods: {
    jump(index) {
      sessionStorage.setItem("prevPage", "/cropper")
      this.$router.replace(this.jump_list[index].url)
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  
</style>