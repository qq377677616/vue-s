<template>
  <div>
    <div id="panorama" ref="panorama"></div>
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
export default {
  name: "",
  props: {
    panoramaConfig: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
    this.panoramaInit()
  },
  methods: {
    //全景图初始化
    panoramaInit() {
      let _panoramaBackImg = [], { panoramaConfig } = this, _getPublicUrl = this.getPublicUrl(panoramaConfig.backImgSrc[0])
      for (let i = _getPublicUrl.startNum; i < panoramaConfig.backImgSrc[1] + _getPublicUrl.startNum; i++) {
        _panoramaBackImg.push({url: `${_getPublicUrl.publicUrl}${i}.${_getPublicUrl.format}` })
      }
      panoramaConfig.panoramaBackImg = _panoramaBackImg
      this.panorama()
    },
    //全景场景创建主程序
    panorama(){
      //创建场景
      let { panoramaConfig } = this, _this = this
      let anta = new C3D.Stage({ el: this.$refs.panorama });
      anta.size(window.innerWidth, window.innerHeight).update();
      //容器
      var spMain = new C3D.Sprite();
      spMain.position(0, 0, -600).update();
      anta.addChild(spMain);
      //loading列表
      var loader = new window.PxLoader();
      loader.addImage("");
      loader.addCompletionListener(function () { gotoIndex();});
      //创建背景场景
      var bg_num = panoramaConfig.backImgSrc[1];
      var o = { w: panoramaConfig.fullImg[0], h: panoramaConfig.fullImg[1] },
      M = o.w / bg_num,
      h = 414,
      Y = panoramaConfig.panoramaBackImg;
      var panoBg = new C3D.Sprite();
      var d = { lat: 0, lon: 0 },
      f = { lon: 0, lat: 0 };
      var c = { lon: panoramaConfig.initDeg, lat: 0 };      
      var p =true;
      function createPanoBg(){
        panoBg.name("panoBg").position(0, 0, 0).update();
        spMain.addChild(panoBg);
        for (var R = 0; R < bg_num; R++) {
          var F = new C3D.Plane,
          H = -360 / bg_num * R,
          J = H / 180 * Math.PI,
          U = h;
          F.size(M, o.h).position(Math.sin(J) * U, 0, Math.cos(J) * U).rotation(0, H + 180, 0).visibility({ alpha: 0 }).material({ image: Y[R].url, bothsides: !1 }).update();
            panoBg.addChild(F);
        }
      }
      createPanoBg();
      //漂浮的物件
      let panoItemsImg = [];
      let panoItems = new C3D.Sprite;
      panoItems.name("panoItems").position(0, 0, 0).update(), 
      panoItemsImg.forEach(function(B, A) {
        var g = B, E = Math.floor(g.x / M), Q = Math.floor((g.x + g.w) / M), I = (g.x % M, new C3D.Sprite);
        I.visibility({ alpha: 0 }).updateV();
        for (var w = E; Q >= w; w++) {
          var D = new C3D.Plane, Y = -360 / bg_num * w, i = Y / 180 * Math.PI, R = h;
          D.size(M, g.h).position((Math.sin(i) * R).toFixed(5), g.y + g.h / 2 - o.h / 2, (Math.cos(i) * R).toFixed(5)).rotation(0, Y + 180, 0).material({ image: g.imgs[w - E], bothsides: !1 }).update(), I.addChild(D);
        }
        var F = -360 / bg_num * (Q + E) / 2 + 180, H = F / 180 * Math.PI, J = g.l;
        I.position(Math.sin(H) * J, 0, Math.cos(H) * J).updateT(), 
        panoItems.addChild(I);
      })
      spMain.addChild(panoItems);
      let panoDots = new C3D.Sprite;
      panoDots.name("panoDots").visibility({ alpha: 0 }).position(0, 0, 0).update();
      panoramaConfig.hotspotList.forEach(function(B, A) {
        var g = B, Q = -360 * (g.x - 80) / o.w, G = 90 * (g.y - o.h / 2) / o.h, M = Q / 180 * Math.PI, Y = h - 80,
        i = C3D.create({ type: "sprite", name: g.name, scale: [1], children: [{ type: "plane", name: "dot", size: [g.w, g.h], position: [0, 2, 2], rotation: [G, 0, 0], material: [{ image: g.imgUrl }], bothsides: !1 }, { type: "plane", name: "label", size: [0, g.h], rotation: [G, 0, 0], origin: [-18, 33], material: [{ image: g.imgUrl/*g.label*/ }], bothsides: !1 }] });
        i.position(Math.sin(M) * Y, .9 * (g.y - o.h / 2), Math.cos(M) * Y).rotation(0, Q + 180 - 5, 0).updateT(), 
        i.on("touchend", function() { if(i._name=="tips_move_rqq2"){ return; } i.update(); }), 
        i.on("touchstart",function(){ if(i._name=="tips_move_rqq2"){ return; } i.update(); });
        i.r0 = Q, i.w0 = g.w, i.dot.alpha = 0, i.dot.updateV(),
        function(){
          if (i._name[5]=="m") {
            JT.to(i.dot, 2,{ x:-(i.dot.x + 300), y:i.dot.y + 600, yoyo: false, repeat: -1, ease: JT.Quad.InOut, onUpdate: function() { this.target.updateT(); }});
          } 
          if (i._name[5]=="s") { JT.to(i.dot, 3,{ x:-(i.dot.x + 400), y:i.dot.y + 400, yoyo: false, repeat: -1, ease: JT.Quad.InOut, onUpdate: function() { this.target.updateT(); }});
          } 
        }(),
        panoDots.addChild(i)
      })    
      spMain.addChild(panoDots);
      var originTouchPos = { x: 0, y: 0 }, oldTouchPos = { x: 0, y: 0 }, newTouchPos = { x: 0, y: 0 }, firstDir = "", originTime = 0, oldTime = 0, newTime= 0, dx = 0, dy = 0, ax = 0, ay = 0, time = 0;
      var onTouchStart = function(t) {
        firstDir = ""
        t = t.changedTouches[0]
        if (t.target.parentNode.attributes['data-name'].value == "m") { 
          anta.off("touchmove", onTouchMove), anta.off("touchend", onTouchEnd)
        } else {
          originTouchPos.x = oldTouchPos.x = newTouchPos.x = t.clientX
          originTouchPos.y = oldTouchPos.y = newTouchPos.y = t.clientY
          originTime = oldTime = newTime = Date.now();
          dx = dy = ax = ay = 0
          anta.on("touchmove", onTouchMove)
          anta.on("touchend", onTouchEnd)
        }
      };
      anta.on("touchstart", onTouchStart)
      var onTouchMove = function(t) {
        anta.off("touchend", onTouchEnd)
        return t = t.changedTouches[0], 
        newTouchPos.x = t.clientX, 
        newTouchPos.y = t.clientY, 
        newTime = Date.now(), 
        checkGesture(), 
        oldTouchPos.x = newTouchPos.x, 
        oldTouchPos.y = newTouchPos.y, 
        oldTime = newTime, !1
      };
      var onTouchEnd = function(e) {
        newTime = Date.now();
        var t = (newTime - oldTime) / 1e3;
        //全景点击事件
        _this.$emit("hotspotClick", { dataName: e.target.parentNode.attributes['data-name'].value })
        anta.off("touchmove", onTouchMove), 
        anta.off("touchend", onTouchEnd);
      }
      function checkGesture(){
        dx = fixed2(newTouchPos.x - originTouchPos.x), 
        dy = fixed2(newTouchPos.y - originTouchPos.y), 
        ax = fixed2(newTouchPos.x - oldTouchPos.x), 
        ay = fixed2(newTouchPos.y - oldTouchPos.y), 
        time = (newTime - oldTime) / 1e3, 
        "" == firstDir && (Math.abs(ax) > Math.abs(ay) ? firstDir = "x" : Math.abs(ax) < Math.abs(ay) && (firstDir = "y"));
        if (!p) {
          c.lon = (c.lon - .2 * ax) % 360,
          c.lat = Math.max(panoramaConfig.vertical * -1, Math.min(panoramaConfig.vertical, c.lat + .2 * ay))
        }
      }
      function fixed2(t) { return Math.floor(100 * t) / 100; }
      requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
      function (callback) { setTimeout(callback, 1000 / 60); };
      //执行move动画
      function actiondh() {
        var t = (d.lon + f.lon + c.lon) % 360,
            i = .2 * (d.lat + f.lat + c.lat);
        t - panoBg.rotationY > 180 && (panoBg.rotationY += 360),
        t - panoBg.rotationY < -180 && (panoBg.rotationY -= 360);
        var n = t - panoBg.rotationY,
            a = i - panoBg.rotationX;
        Math.abs(n) < .1 ? panoBg.rotationY = t : panoBg.rotationY += .3 * n, 
        Math.abs(a) < .1 ? panoBg.rotationX = i : panoBg.rotationX += panoramaConfig.wobble * a, 
        panoBg.updateT();
        panoDots.rotationY = panoBg.rotationY, 
        panoDots.rotationX = panoBg.rotationX, 
        panoDots.updateT(), 
        t - panoItems.rotationY > 180 && (panoItems.rotationY += 360),
        t - panoItems.rotationY < -180 && (panoItems.rotationY -= 360);
        var o = t - panoItems.rotationY,
            r = i - panoItems.rotationX;
        Math.abs(o) < .1 ? panoItems.rotationY = t : panoItems.rotationY += .25 * o, Math.abs(r) < .1 ? panoItems.rotationX = i : panoItems.rotationX += .15 * r, panoItems.updateT();
        var s12 = -150 - 20 * Math.abs(n);
        spMain.z += .1 * (s12 - spMain.z)
        spMain.updateT()
        panoDots_show(panoDots.rotationY)
        let A = requestAnimationFrame(actiondh);
        if (!isD) { isD = true; }
      }
      var isD = false;
      function  panoDots_show(t) {
        var i = (-180 - t) % 360;
        i = i > 0 ? i - 360 : i;
        for (var e = 0, a = panoDots.children.length; a > e; e++) {
          var o = panoDots.children[e];
          o.r0 > i - 5 && o.r0 < i + 25 ? 0 == o.label.width &&((o.label),o.label.width=50,o.dot.alpha=1,o.dot.updateV()):o.label.width == 50&&((o.label),o.label.width=0,o.dot.alpha=0.5,o.dot.updateV());
        }
      }
      window.ontouchmove = function(e) {e.preventDefault();};
      //重力感应
      var o2 = new Orienter();
      o2.handler = function (t) {
        d.lon = -t.lon,
        d.lat = t.lat
        if (p) {
          f.lat = -d.lat, 
          f.lon = -d.lon
        }
      };
      o2.init();
      //执行主场景入场动画
      window.gotoIndex = function gotoIndex(){
        JT.fromTo(spMain, 6, { z: -2400 }, { z: -150, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT().updateV(); }, onEnd:function(){ 
          p = false;actiondh();
          JT.to($("#bg"), 1, { opacity: 1});
          // JT.to(document.getElementById('bg'), 1, { opacity: 1});
          for(var i=0;i<panoDots.children.length;i++){
            JT.to(panoDots.children[i]['dot'], 1, { alpha: 1, ease: JT.Quad.In, onUpdate: function () { this.target.updateV(); } });
          }
        }});
        JT.fromTo(panoBg, 4, { rotationY: -720 }, {rotationY: panoramaConfig.initDeg, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT().updateV();
            },onEnd:function(){ }
        });
        for (var A = 0, B = panoBg.children.length; B > A; A++) {
          JT.from(panoBg.children[A], 0.5, {x: 0, z: 0, scaleX: 0, scaleY: 0, delay: .05 * A, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT(); }, onStart: function() {this.target.visibility({alpha: 1}).updateV();}
          });
        } 
        for (var g = 0, C = panoItems.children.length; C > g; g++){
          JT.from(panoItems.children[g], 2, {x: 0, z: 0, scaleX: .01, scaleY: .01, scaleZ: .01, delay: Math.random() + 2, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT(); }, onStart: function() { this.target.visibility({ alpha: 1 }).updateV(); }
          });
        }
        JT.fromTo(panoItems, 4, { rotationY: -720 }, { rotationY: 25, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT().updateV(); } })
        JT.fromTo(panoDots, 2, { rotationY: -360, alpha: 0 }, { rotationY: 25, alpha: 1, delay: 2, ease: JT.Quad.Out, onUpdate: function() { this.target.updateT().updateV(); }, onStart: function() { this.target.visibility({ alpha: 1 }).updateV(); }
        })
      }
      // var resize =function() {
      //   setTimeout(function() {
      //     anta.size(window.innerWidth, window.innerHeight).update();
      //   }, 500);
      // }
      // $(window).on("resize",function(){resize()});       
      loader.start();
    },
    //url解析
    getPublicUrl(url) {
      let urlArray = url.split("/")    
      let order = urlArray[urlArray.length - 1].replace(/[^\d]/ig, '')     
      let _index = url.indexOf(`${order}.`)
      return { publicUrl: url.slice(0, _index), format: url.slice(url.indexOf(`${order}.`) + order.length + 1), startNum: parseInt(order) }
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  #panorama>>>div{
    background-repeat: no-repeat;
  }
  #panorama>>>div[data-name="title1"]{animation:wobble 2s infinite alternate;}
</style>