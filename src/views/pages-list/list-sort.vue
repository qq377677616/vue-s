<template>
  <div class="body sort">
    <my-header :title="pageTitle"></my-header>
    <div class="category">
      <slickList :lockToContainerEdges="true" class="dl" axis="xy" lockAxis="xy" v-model="categoryList" @input="getChangeLists" :pressDelay="pressDelay" ref="dlList">
        <SlickItem class="dd" v-for="(item, index) in categoryList" :index="index" :key="index">
          <img :src="require('assets/images/list_0'+(item.$index + 1)+'.png')" alt="">
          <p>{{ item.name }}</p>
          <div class="click-box" :data-index="index"></div>
        </SlickItem>
      </slickList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  name: "",
  data() {
    return {
      pageTitle: "拖拽排序",
      pressDelay: 500,//长按多久时间触发拖拽
      categoryList: [
        { name:'经济发展', $index: 0},   
        { name:'公共安全', $index: 1},   
        { name:'交通运行', $index: 2},   
        { name:'城市规划', $index: 3},   
        { name:'生态环境', $index: 4},   
        { name:'民生服务', $index: 5},   
        { name:'城市治理', $index: 6},   
        { name:'应急指挥', $index: 7}  
      ]
    }
  },
  created() {
    this.setLocalStorage()
    setTimeout(() => { this.$toast("长按icon图片进行拖拽排序") }, 500)
  },
  mounted() {
    window.addEventListener('scroll', res => {
      this.curScrollTop =  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (this.curScrollTop > this.offsetTop_booth) {
        this.isShowCategoryList = true
      } else {
        this.isShowCategoryList = false
      }
    })
  },
  methods: {
    setLocalStorage() {
      if (localStorage.getItem("newArr")) {
        this.categoryList = JSON.parse(localStorage.getItem("newArr"))
      }
    },
    getChangeLists (newArr) {
      console.log("拖拽完成的最新数据：", newArr)
      localStorage.setItem("newArr", JSON.stringify(newArr))
    }
  },
  components: {
    MyHeader,
    SlickList,
    SlickItem         
  }
}
</script>

<style scoped>
  .sort{padding-top: .92rem;box-sizing: border-box;}
  .category{padding:.3rem 0 .1rem;font-size: 0;text-align: center;}
  .category .dl{text-align: left;}
  /* body>>>.dd{text-align: center !important;} */
  .category dd,.category .dd{position: relative;text-align: left;}
  .category dd,.category .dd{width:17%;padding-bottom: .24rem;;border-radius: 50%;display: inline-block;margin:.1rem 3.5%;text-align: center;}
  .category dd img,.category .dd img{width:1rem;}
  .category dd p,.category .dd p{font-size: .22rem;color:#787878;padding-top: .12rem;}
  .category .dd .click-box{width:100%;height:100%;position: absolute;left:0;top:0;}
</style>