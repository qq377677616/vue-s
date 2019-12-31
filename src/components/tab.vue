<template>
  <div class="tab">
    <dl class="flex-aro">
      <dd v-for="(item, $index) in tabList" :key="$index" @click="jumps($index)" :class="[curIndex == $index ? 'cur' : '']"> 
        <i class="iconfont" :class="$index == curIndex ? item.icons : item.icon"></i>
        <p>{{item.title}}</p>
      </dd>
    </dl>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "",
    props: {
      // curIndex: {
      //   type: Number,
      //   default: 0
      // }
    },
    data() {
      return {
        tabList: [
          { title: "首页",path:"/",  icon: "icon-shouye_xianxing", icons: "icon-shouye_tianchong"},
          { title: "我的",path:"/doctor",  icon: "icon-wode_xianxing", icons: "icon-wode_tianchong"},
        ],
        curIndex: 0
      }
    },
    created() {
      let _url = window.location.href.toLowerCase() || ''
      if (_url.indexOf('about') != -1) {
        this.curIndex = 1    
      } else {
        this.curIndex = 0
      }
    },
    mounted() {
      
    },
    methods: {
      jumps($index) {
        if ($index == 0) {
          this.$router.replace('/')    
        } else if ($index == 1) {
          this.$router.replace('/about')    
        }
        this.curIndex = $index  
      }    
    }
  }
</script>

<style scoped>
  .tab{width: 100%;position: fixed;left:0;bottom:0;z-index: 9999;text-align: center;background: #fff;box-shadow: 0 .3rem .5rem 0 rgba(82, 86, 90, 0.81);}
  .tab img{height:.52rem;}
  .tab dd:nth-child(3) img{height:.75rem;}
  .tab dd{font-size: 0;padding:.12rem 0 .14rem;width: 20%;position: relative;z-index: 5;}
  .tab dd i{font-size: .42rem;}
  .tab dd.cur i,.tab dd.cur p{color:#027C60;}
  .tab dd p{font-size: .22rem;color:#000;padding-top: 0.1rem;}
</style>