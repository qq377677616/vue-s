<template>
  <div class="body map">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
import { loadScript } from 'assets/js/util'
import maps from "qqmap"
export default {
  name: "",
  data() {
    return {
      pageTitle: "腾讯地图",
      map: null,
      markerIndex: 0,
      markerList: [
        { position: [39.916527, 116.417128] },
        { position: [39.916527, 116.397128] },
        { position: [39.916527, 116.37128] }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //地图初始化
    init() {
      // loadScript("https://map.qq.com/api/js?v=2.exp&key=2O6BZ-N3HK6-IQTS3-EEVSR-AGBLQ-UBFKJ").then(() => {
        console.log("qq", qq)
        console.log("qq.maps", qq.maps)
        console.log("qq.maps.Map", qq.maps.Map)
        this.map = new qq.maps.Map(document.getElementById('container'),{ center: new qq.maps.LatLng(39.916527,116.397128), zoom: 12 })
        this.markerList.forEach(item => {
          this.createMarker(item.position)
        })
      // })
    },
    //创建标注点
    createMarker(position) {
      this.markerIndex++
      window[`marker${this.markerIndex}`] = new qq.maps.Marker({
        //设置Marker的位置坐标
        position: new qq.maps.LatLng(position[0], position[1]),
        //id索引
        id: this.markerIndex,
        //设置Marker被添加到Map上时的动画效果为落下
        animation: qq.maps.MarkerAnimation.DOWN,
        clickable: true,
        //设置Marker被添加到Map上时的动画效果为反复弹跳
        //animation:qq.maps.MarkerAnimation.BOUNCE
        //设置Marker被添加到Map上时的动画效果为从天而降
        //animation:qq.maps.MarkerAnimation.DROP
        //设置Marker被添加到Map上时的动画效果为升起
        //animation:qq.maps.MarkerAnimation.UP
        //设置显示Marker的地图
        map: this.map,
        //设置Marker可拖动
        draggable: false,
        //Marker的覆盖内容
        // decoration: new qq.maps.MarkerDecoration("标记"),
        //自定义Marker图标为大头针样式
        icon: new qq.maps.MarkerImage("https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png"),
        //自定义Marker图标的阴影
        // shadow: new qq.maps.MarkerImage("https://open.map.qq.com/doc/img/nilb.png"),
        //设置Marker标题，鼠标划过Marker时显示
        title: '测试',
        //设置Marker的可见性，为true时可见,false时不可见
        visible: true
      });
      //点击标注
      var info = new qq.maps.InfoWindow({ map: this.map });//添加到提示窗
      qq.maps.event.addListener(window[`marker${this.markerIndex}`], 'click', e => {
        console.log("点击的哪个标注", e.target.id)
        // console.log("e", e)    
        //  info.open();
        //  info.setContent('<div style="text-align:center;white-space:nowrap;'+
        //  'margin:0px;">单击标记</div>');
        //  info.setPosition(center);
      });
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  #container{width:100vw;height:calc(100vh - .92rem);}
</style>