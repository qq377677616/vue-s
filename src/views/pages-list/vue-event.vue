<template>
  <div class="vue-event body">
    <My-Header :title="pageTitle"></My-Header>
    <div class="full-screen flex-cen">
      <v-touch @swipeup="swipeup" @swipedown="swipedown" @swipeleft="swipeleft" @swiperight="swiperight" @pressup="pressup" class="vue-event-box flex-cen">对我进行<br/>长按<br/>向上<br/>向下<br/>向左<br/>向右<br/>滑动触摸</v-touch>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
// import 'assets/js/vue-event'
export default {
  name: "vue-event",
  data() {
    return {
      pageTitle: "vue触摸事件"
    }
  },
  methods: {
    swipeup() {
      this.$toast("向上滑动")
    },
    swipedown() {
      this.$toast("向下滑动")
    },
    swipeleft() {
      this.$toast("向左滑动")
    },
    swiperight() {
      this.$toast("向右滑动")
    },
    pressup() {
      this.$toast("长按成功")
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .vue-event-box{width:4rem;height:4rem;background: #18A05E;font-size: .36rem;text-align: center;line-height: 1.4;color:#fff;}
</style>