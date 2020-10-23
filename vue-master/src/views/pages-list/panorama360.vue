<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <!-- <div class="full-screen"> -->
      <panorama-week :panoramaConfig="panoramaConfig" @hotspotClick="hotspotClick"></panorama-week>
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import PanoramaWeek from "base/PanoramaWeek.vue"
export default {
  name: "",
  data() {
    return {
      pageTitle: "360全景",
      panoramaConfig: {
        fullImg:[2664, 1332],//总全景图宽高
        backImgSrc: ['https://img.vrupup.com/web/szq/panorama360/images/panorama/backimg/page_1.jpg', 24], //第一张全景图完整路径及总张数

        // fullImg:[3200, 1080],//总全景图宽高
        // backImgSrc: ['https://img.vrupup.com/web/tjh/salmon_h5/images/center/1.jpg', 32], //第一张全景图完整路径及总张数

        fov: 0.5,//视角
        backColor: "#62312E",//背景颜色
        initDeg: 55, //全景左右水平方向初始位置
        vertical: 1,//全景上下垂直方向限定可视角度
        wobble: 1,//全景上下垂直方向限定灵敏度阈值
        hotspotList: [//全景图上所有物品，注：这里的图片路径可以考虑用本地路径，如：require('../../assets/images/page8_16.png')
          { name: "title1", w: 244, h: 400, x: 1800, y: 500, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_16.png' },
          { name: "title2", w: 243, h: 280, x: 2200, y: 540, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_17.png' },
          { name: "title3", w: 244, h: 260, x: 2480, y: 550, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_18.png' },
          { name: "title4", w: 308, h: 300, x: 550, y: 400, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_12.png' },
          { name: "title5", w: 242, h: 320, x: 250, y: 500, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_11.png' },
          { name: "title6", w: 243, h: 330, x: 900, y: 470, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_13.png' },
          { name: "title7", w: 309, h: 230, x: 1150, y: 550, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_14.png' },
          { name: "title8", w: 243, h: 230, x: 1500, y: 550, imgUrl: 'https://img.vrupup.com/web/szq/panorama360/images/panorama/goods/page8_15.png' }
          // { name: "title9", w: 258, h: 197, x: -1000, y: 400, imgUrl: 'https://img.vrupup.com/web/tjh/salmon_h5/images/center/center_baskey_01.png' }
        ]
      }
    }
  },
  mounted() {
    
  },
  methods: {
    //全景中热点点击事件
    hotspotClick({ dataName }) {
      var _index = dataName.replace(/[^0-9]/ig, '')
      if (_index == 1) {
        alert("【花神●奇幻城堡】")
      } else if (_index == 2) {
        alert("【紫雾●奇幻城堡】")
      } else if (_index == 3) {
        alert("【千寻●奇幻城堡】")
      } else if (_index == 4) {
        alert("【天空之城●奇幻城堡】")
      } else if (_index == 5) {
        alert("【天鹅●奇幻城堡】")
      } else if (_index == 6) {
        alert("【无界●奇幻城堡】")
      } else if (_index == 7) {
        alert("【贤者之城●奇幻城堡】")
      } else if (_index == 8) {
        alert("【浮梦●奇幻城堡】")
      }
    }
  },
  components: {
    MyHeader,
    PanoramaWeek
  }
}
</script>

<style scoped>
  
</style>