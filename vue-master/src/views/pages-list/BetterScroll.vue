<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen-col">
      <!-- 滚动区域部分 -->
      <div class="scroll-box">
        <scroll ref="myScroll" class="box" :scrollbar="scrollbar" @beforeScroll="beforeScroll" @scrollEnd="scrollEnd" @scroll="scroll" @pulldown="pulldown" @pullup="pullup">
          <div class="p-box">
            <div class="p" :id="'p'+(index+1)" v-for="(item, index) in 30" :key="item">{{index + 1}}、这是一些测试内容这是一些测试内容这是一些测试内容这是一些测试内容这是一些测试内容这是一些测试内容</div>
          </div>
        </scroll>
      </div>
      <!-- 控制部分 -->
      <div class="controls">
        <div class="flex-bet">
          <button @click="refresh">重新计算</button>
          <button @click="disable">冻结</button>
          <button @click="enable">解冻</button>
        </div>
        <div class="flex-bet">
          <button @click="scrollTo">滚动到指定数值</button>
          <button @click="scrollToElement">滚动到指定元素</button>
          <button @click="scrollBy">相对当前位置滚动</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll.vue'
import MyHeader from "components/header.vue"
export default {
  name: "",
  data() {
    return {
      pageTitle: "滚动组件",//页面标题
      scrollbar: 1//是否显示滚动条  0：不显示滚动条，1：一直显示滚动条，2：滚动时显示滚动条
    }
  },
  methods: {
    //滚动监听回调
    scroll(e) {
      console.log("【滚动】", e)
    },
    //下拉触顶回调
    pulldown(e) {
      this.$toast('下拉刷新')
    },
    //上拉触底回调
    pullup(e) {
      this.$toast('上拉加载')
    },
    //开始触摸回调
    beforeScroll() {
      console.log('【开始触摸滑动】')
    },
    //结束滑动回调
    scrollEnd() {
      console.log('【滑动结束】')
    },
    //重新计算
    refresh() {
      this.$refs.myScroll.refresh()
      this.$toast('已重新计算')
    },
    //冻结
    disable() {
      this.$refs.myScroll.disable()
      this.$toast('已冻结')
    },
    //解冻
    enable() {
      this.$refs.myScroll.enable()
      this.$toast('已解冻')
    },
    //滚动至目标位置
    scrollTo() {
      this.$refs.myScroll.scrollTo(-100, -190, 1000)
      this.$toast('已滚动至目标位置x:-100,y:-190')
    },
    //滚动到目标元素
    scrollToElement() {
      this.$refs.myScroll.scrollToElement("#p18", 500)
      this.$toast('已滚动至目标dom元素（"#p18"）')
    },
    //相对于当前位置滚动一定距离
    scrollBy() {
      this.$refs.myScroll.scrollBy(-50, -50, 500)
      this.$toast('已相对于当前位置分别滚动x与y方向50距离')
    }
  },
  components: {
    MyHeader,
    Scroll
  }
}
</script>

<style scoped>
  .scroll-box{width: 100%;}
  .box{height: 300px;width: 80%;margin:0 auto;background: #eee;padding:10px;overflow:hidden;position: relative;}
  .p{font-size: .3rem;line-height: 1.5;text-indent: 2em;padding: .2rem;}
  .controls{padding-top: .5rem;}
  .controls button{margin:.1rem;background: #ccc;border-radius: .1rem;width: 2rem;height: .64rem;}
  .p-box{width: 150vw;}
  /******滚动条样式******/
  /**竖向滚动条 */
  .box>>>.bscroll-vertical-scrollbar{background:rgba(0,0,0,.2);width: 4px !important;overflow: visible !important;right:2px !important;}/*滚动条轨道*/
  .box>>>.bscroll-vertical-scrollbar .bscroll-indicator{border:none !important;background: #027C60 !important;margin-left: -2px;width:8px !important;}/*滚动头*/
  /**横向滚动条 */
  .box>>>.bscroll-horizontal-scrollbar{background:rgba(0,0,0,.2);height:4px !important;}/*滚动条轨道*/
  .box>>>.bscroll-horizontal-scrollbar .bscroll-indicator{border:none !important;background:#008AD3 !important;height:4px !important;}/*滚动头*/
</style>