<template>
  <div class="body map">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
// import { loadScript } from 'assets/js/util'
// import maps from "qqmap"
export default {
  name: "",
  data() {
    return {
      pageTitle: "腾讯地图",//页面标题
      map: null,//地图实例
      markerIndex: 0,//标注点索引
      markerList: [//标注点
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
        this.map = new TMap.Map('container', { 
          center: new TMap.LatLng(28.178094,112.982704),
          zoom: 16, //地图缩放级别
          viewMode:'2D',
          pitch: 43.5,  //俯仰角
          rotation: 45  //地图旋转角度
        })
        this.MultiPolyline()
        // this.markerList.forEach(item => {
        //   this.createMarker(item.position)
        // })
        //修改地图中心点
        // var centerLatLng = this.map.getCenter();
        // console.log("centerLatLng", centerLatLng)
        // setInterval(() => { console.log(this.map.getCenter()) }, 1000)
      // })
    },
    //绘制路线 MultiPolyline
    MultiPolyline() {
      let _this = this
      var polylineLayer = new TMap.MultiPolyline({
        id: 'polyline-layer', //图层唯一标识
        map:_this.map,//设置折线图层显示到哪个地图实例中
        //折线样式定义
        styles: {
            'style_blue': new TMap.PolylineStyle({
                'color': '#3777FF', //线填充色
                'width': 6, //折线宽度
                'borderWidth': 5, //边线宽度
                'borderColor': '#FFF', //边线颜色
                'lineCap': 'butt' //线端头方式
            }),
            'style_red': new TMap.PolylineStyle({
                'color': '#CC0000', //线填充色
                'width': 6, //折线宽度
                'borderWidth': 5, //边线宽度
                'borderColor': '#CCC', //边线颜色
                'lineCap': 'round' //线端头方式
            })
        },
        //折线数据定义
        geometries: [
            {//第1条线
                'id': 'pl_1',//折线唯一标识，删除时使用
                'styleId': 'style_blue',//绑定样式名
                'paths': [new TMap.LatLng(28.175477,112.980974), new TMap.LatLng(28.173727,112.985244), new TMap.LatLng(28.176300,112.984289)]
            }
        ]
    });
    },
    //创建标注点
    createMarker(position) {
      this.markerIndex++
      window[`marker${this.markerIndex}`] = new TMap.Marker({
        //设置Marker的位置坐标
        position: new TMap.LatLng(position[0], position[1]),
        //id索引
        id: this.markerIndex,
        //设置Marker被添加到Map上时的动画效果为落下
        // animation: TMap.MarkerAnimation.DOWN,
        clickable: true,
        //设置Marker被添加到Map上时的动画效果为反复弹跳
        // animation:TMap.MarkerAnimation.BOUNCE,
        //设置Marker被添加到Map上时的动画效果为从天而降
        // animation:TMap.MarkerAnimation.DROP,
        //设置Marker被添加到Map上时的动画效果为升起
        // animation:TMap.MarkerAnimation.UP,
        //设置显示Marker的地图
        map: this.map,
        //设置Marker可拖动
        draggable: false,
        //Marker的覆盖内容
        // decoration: new TMap.MarkerDecoration("标记"),
        //自定义Marker图标为大头针样式
        icon: new TMap.MarkerImage("https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png"),
        //自定义Marker图标的阴影
        // shadow: new TMap.MarkerImage("https://open.map.qq.com/doc/img/nilb.png"),
        //设置Marker标题，鼠标划过Marker时显示
        title: '测试',
        //设置Marker的可见性，为true时可见,false时不可见
        visible: true
      });
      //点击标注
      var info = new TMap.InfoWindow({ map: this.map });//添加到提示窗
      TMap.event.addListener(window[`marker${this.markerIndex}`], 'click', e => {
        console.log("点击的哪个标注", e.target.id)
        // console.log("e", e)    
        //  info.open();
        //  info.setContent('<div style="text-align:center;white-space:nowrap;'+
        //  'margin:0px;">单击标记</div>');
        //  info.setPosition(center);
      })
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