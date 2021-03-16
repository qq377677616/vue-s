<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen">
      <!-- 跳转小程序[gh_ad14cc81048f, gh_3547ec19af8c] -->
      <wx-open-launch-weapp
        id="launch-btn"
        username="gh_3547ec19af8c"
        path="pages/index/index?id=123456"
      >
        <script type="text/wxtag-template">
          <style>.btn{ width:200px;height:50px; }</style>
          <button class="btn">跳转小程序</button>
        </script>
      </wx-open-launch-weapp>
      <p>------</p>
      <wx-open-launch-weapp
        id="launch-btn"
        username="gh_3547ec19af8c"
        path="pages/index/index?id=123456"
      >
        <script type="text/wxtag-template">
          <style>.btn{ width:200px;height:50px; }</style>
          <button class="btn">跳转小程序2</button>
        </script>
      </wx-open-launch-weapp>
      <!-- 跳转到APP -->
      <!-- 跳转APP[wx65528a702a565358, wx4b9990682f08b4af] -->
      <wx-open-launch-app
        id="launch-btn-app"
        appid="wx4b9990682f08b4af"
        extinfo="your-extinfo"
      >
        <script type="text/wxtag-template">
          <style>.btn{ width:200px;height:50px; }</style>
          <button class="btn">跳转App</button>
        </script>
      </wx-open-launch-app>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue";
export default {
  name: "",
  data() {
    return {
      pageTitle: "h5跳转小程序", //页面标题
    };
  },
  methods: {
    ready() {
      console.log("跳转app准备好了");
    },
  },
  components: {
    MyHeader,
  }
};
</script>

<style scoped>
</style>