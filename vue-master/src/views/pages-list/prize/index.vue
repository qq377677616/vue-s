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
  name: "prize-list",
  data() {
    return {
      pageTitle: '抽奖系列',
      jump_list: [
        { title: "圆盘抽奖(针转)", url: "/prize/prize1", name: 'prize1'},
        { title: "圆盘抽奖(盘转)", url: "/prize/prize2", name: 'prize2'},
        { title: "跑马灯抽奖", url: "/prize/prize3", name: 'prize3'},
        { title: "刮刮乐", url: "/prize/prize4", name: 'prize4'},
        { title: "老虎机", url: "/prize/prize5", name: 'prize5'}
      ]
    }
  },
  methods: {
    jump(index) {
      sessionStorage.setItem("prevPage", "/prize")
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