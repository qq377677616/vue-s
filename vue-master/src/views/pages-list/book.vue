<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen">
      <turn-book ref="book" :bookConfig="bookConfig" @bookInitOk="bookInitOk" @prevNextCallBack="prevNextCallBack"></turn-book>
      <div>
        <div class="btn prev" :class="{'dis': currPageIndex == 1}" @click="pagePrevNext(1)">上翻</div>
        <div class="btn next" :class="{'dis': currPageIndex == bookConfig.pages}" @click="pagePrevNext">下翻</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
import TurnBook from "base/TurnBook.vue"
export default {
  name: "",
  data() {
    return { 
      pageTitle: "翻书",
      bookConfig: {
        width: '100vw',
        height: '100vh',
        duration: 2000,//翻页速度，值越小越快
        elevation: 50,//翻页时从动画书边缘的高度
        pages: 7,//总页数
        //图片路径 支持线上和本地配置
        // imgUrl: 'https://img.vrupup.com/web/szq/book/pages/1.png'
        imgUrl: [
          require('../../assets/images/book/1.png'),
          require('../../assets/images/book/2.png'),
          require('../../assets/images/book/3.png'),
          require('../../assets/images/book/4.png'),
          require('../../assets/images/book/5.png'),
          require('../../assets/images/book/6.png'),
          require('../../assets/images/book/7.png')
        ]
      },
      currPageIndex: 1//当面页码
    }
  },
  methods: {
    //初始化完成
    bookInitOk(e) {
      console.log("【初始化完成】", e)
      this.currPageIndex = e.pageIndex
    },
    //翻页回调
    prevNextCallBack(e) {
      console.log("【翻页完成】", e)
      this.currPageIndex = e.pageIndex
    },
    //点击翻上一页、下一页
    pagePrevNext(type) {
      this.$refs.book.pagePrevNext(type)
    }
  },
  components: {
    MyHeader,
    TurnBook
  }
}
</script>

<style scoped>
  .body{padding-top: 0;}
  .btn{width:1rem;height: 1rem;border-radius: 50%;background: #DD5145;text-align: center;line-height: 1rem;font-size: .3rem;color:#fff;font-weight: bold;position: absolute;left:.5rem;top:48%;z-index: 10000;}
  .btn.next{left:auto;right:.5rem;}
  .btn.dis{background: #ccc;}
</style>