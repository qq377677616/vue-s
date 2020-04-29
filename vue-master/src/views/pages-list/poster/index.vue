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
  name: "poster-list",
  data() {
    return {
      pageTitle: '生成海报',
      jump_list: [
        { title: "html2canvas", url: "/poster/poster1", name: 'poster1'},
        { title: "DIY版", url: "/poster/poster3", name: 'poster3'},
        { title: "原生版", url: "/poster/poster2", name: 'poster2'}
      ]
    }
  },
  methods: {
    jump(index) {
      sessionStorage.setItem("prevPage", "/poster")
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