<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen-col">
      <van-button type="primary" @click="throttles2">方法式节流</van-button>
      <van-button type="primary" @click="throttles">计算属性式节流</van-button>
      <van-button type="info" @click="debounce2">方法式防抖</van-button>
      <van-button type="info" @click="debounce">计算属性式防抖</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { DEBOUNCE, THROTTLE } from "assets/js/util"
export default {
  name: "",
  data() {
    return {
      pageTitle: "防抖与节流", //页面标题
    };
  },
  methods: {
    //方法式防抖，无法访问this（时间参数可选，默认2000）
    debounce2: DEBOUNCE(() => {
      console.log("this", "方法式防抖", this)
    }, 2000),
    //方法式节流，无法访问this（时间参数可选，默认2000）
    throttles2: THROTTLE(() => {
      console.log("this", "方法式节流", this)
    }, 2000)
  },
  computed: {
    //计算属性式节流,可访问this（时间参数可选，默认2000）[推荐]
    debounce() {
      return DEBOUNCE(() => {
        console.log("this", "计算属性式防抖", this)
      }, 2000)
    },
    //计算属性式节流,可访问this（时间参数可选，默认2000）[推荐]
    throttles() {
      return THROTTLE(() => {
        console.log("this", "计算属性式节流", this)
      }, 2000)
    }
  },
  components: {
    MyHeader,
  },
};
</script>

<style scoped>
  .van-button{width: 130px;margin:10px 0;}
</style>