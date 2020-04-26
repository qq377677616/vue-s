<template>
  <div class="body cropper">
    <My-Header :title="pageTitle"></My-Header>
    <div class="con-box">
      <dl class="item-list">
        <dd v-for="(item, index) in jump_list" :key="'key'+index" @click="jump(index)">{{item.title}}</dd>
      </dl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
export default {
  name: "upload-list",
  data() {
    return {
      pageTitle: '文件上传',
      jump_list: [
        { title: "vant上传", url: "/upload/upload3", name: 'upload3'},
        { title: "微信jssdk上传", url: "/upload/upload2", name: 'upload2'},
        { title: "原生上传", url: "/upload/upload1", name: 'upload1'}
      ]
    }
  },
  methods: {
    jump(index) {
      sessionStorage.setItem("prevPage", "/upload")
      this.$router.replace({ name: this.jump_list[index].name, params:{id:'1'}})
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  
</style>