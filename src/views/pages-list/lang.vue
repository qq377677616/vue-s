<template>
  <div class="body">
    <my-header :title="$t('my.title')"></my-header>
    <div class="full-screen">
      <div class="top">
        <div class="avatar"><img src="https://wx.qlogo.cn/mmopen/vi_32/44xsic9D7JxgQzrOYfle1o9W7vwWU2PT2naTdTxofiahSt5WEhTk1icKqLWp2ZN7zKjWGQJdbWcH8FUdrv0kiaHmAg/132" alt=""></div>
        <h3>{{$t('my.nickname')}}</h3>
        <h4 @click="openLangList">{{$t('my.top_button')}}</h4>
      </div>
      <div class="bottom">
        <ul>
          <li v-for="(item, index) in list" :key="'key' + item.icon" class="flex-bet">
            <div class="left flex-bet">
              <i class="iconfont" :class="item.icon"></i>
              <p>{{$t('my.list['+index+']')}}</p>
            </div>
            <i class="arrow iconfont icon-xiangyoujiantou"></i>
          </li>
        </ul>
      </div>
    </div>
    <lang ref="lang"></lang>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import Lang from "base/lang/lang.vue"
export default {
  name: "",
  data() {
    return {
      list: [
        { icon: "icon-bingli1" },
        { icon: "icon-bingli" },
        { icon: "icon-jilu" },
        { icon: "icon-dingdan" },
        { icon: "icon-wenyisheng_xianxing" },
        { icon: "icon-wenyaoshi_tianchong" },
        { icon: "icon-aixin" }
      ]
    }
  },
  methods: {
    openLangList() {
      this.$refs.lang.openLangList()
    }
  },
  components: {
    MyHeader,
    Lang
  }
}
</script>

<style scoped>
  .top{background: #02906F;text-align: center;padding:.5rem 0 1.3rem;position: relative;z-index: 1;}
  .top .avatar{width:1.22rem;height:1.22rem;border-radius: 50%;overflow: hidden;border:.02rem solid #fff;margin:0 auto;}
  .top img{width: 100%;height: 100%;}
  .top h3{font-size: .3rem;color:#fff;padding-top: 0.28rem;}
  .top h4{font-size: .26rem;color:#fff;padding:.1rem .18rem;border-radius: .1rem;border:.02rem solid #fff;position: absolute;right:.24rem;top:.24rem;}
  .bottom{position: relative;z-index: 5;}
  .bottom ul{width:92.22%;margin:-.75rem auto 0;background: #fff;border-radius: .2rem .2rem 0 0;box-shadow:0px 10px 25px 0px rgba(204,204,204,0.3);}
  .bottom li{height:1.1rem;padding:0 .26rem;}
  .bottom li i{font-size: .42rem;color:#02906F;}
  .bottom li p{font-size: .3rem;color:#333;padding-left: .26rem;}
  .bottom li i.arrow{font-size: .3rem;color:#999;}
</style>