<template>
  <div class="body about">
    <!-- 跳转小程序[gh_ad14cc81048f, gh_3547ec19af8c] -->
    <wx-open-launch-weapp id="launch-btn" username="gh_3547ec19af8c" path="pages/index/index?id=123456">     
      <script type="text/wxtag-template">
        <style>.btn{ width:200px;height:50px; }</style>
        <button class="btn">跳转小程序</button>
      </script>
    </wx-open-launch-weapp>
    <p>隔开</p>
    <wx-open-launch-weapp id="launch-btn" username="gh_3547ec19af8c" path="pages/index/index?id=123456">     
      <script type="text/wxtag-template">
        <style>.btn{ width:200px;height:50px; }</style>
        <button class="btn">跳转小程序2</button>
      </script>
    </wx-open-launch-weapp>
    <div class="destination flex-cen">
      <div class="destination-box" ref="boxOk"></div>
    </div>
    <div class="destination-list">
      <div class="destination-scroll">
        <!-- <scroll class="destination-scroll" @scroll="scroll" @pulldown="pulldown" @pullup="pullup"> -->
        <div class="scroll-box flex" :class="{'on': isSelect}">
          <div class="item" v-for="item in 10" :key="item" :ref="'box'+item" @click="selectBox($event, item)">{{item}}</div>
        </div>
        <!-- </scroll> -->
      </div>
    </div>
    <a href="weixin://dl/business/?t=n3COLtyOGZj" target="_blank">跳转小程序</a>
    <My-Header :title="pageTitle" :isBack="false"></My-Header>
    <input type="file" id="file" ref="file" accept="image/*" @change="inputChange2($event)" />
    <img :src="inputImg" alt="">
    <p class="p-box">顺德职业技术学院始于1984年5年成立的广东广播电视大学顺德分校;1998年6月，顺德永强成人学院、顺德李伟强医护学校、顺德成人中专学校和顺德教师进修学校四校合并筹建顺德职业技术学院;1999年3月，教育部正式同意建立顺德职业技术学院;2002年，学校迁入位于德胜东路的新校园。截至2016年12月，顺德职业技术学院校园面积1749亩，建筑面积超过57万平方米；固定资产总额超过12.36亿元人民币， 教学、科研仪器设备总值3.12亿元；设9个二级学院、1个部，开办46个专科专业；全校教职工总数929人，其中高级职称253人。现有专任教师721人，学校全日制在校生15832人，成人教育在读学员3091人。</p>
    <div class="scroll-box">
      <scroll class="box" @scroll="scroll" @pulldown="pulldown" @pullup="pullup">
        <div v-for="item in 30" :key="item">这是内容这是内容这是内容这是内容这是内容这是内容这是内容{{item}}</div>
      </scroll>
    </div>
    <!-- <video ref="video" src="http://game.vrupup.com/resources/web/szq/images/video_03.mp4" autoplay controls></video> -->
    <!-- <button ref="videoBtn" class="video-play" @click="playVideo()">播放视频</button> -->
    <button @click="jiaxinTogglerDiv()">智能客服</button>
    <button @click="startSearchBeacons()">搜索设备</button>
    <button @click="getTest()">get请求</button>
    <button @click="getPosition()">jsonp请求</button>
    <button @click="modifyShare">修改分享路径</button>
    <img src="http://game.flyh5.cn/resources/game/wechat/szq/images/my-code_01.jpg" style="width:200px;" />
    <button @click="showHidePopup()">显示弹窗</button>
    <button @click="showHidePopup(true)">隐藏弹窗</button>
    <!-- <vshare :vshareConfig="vshareConfig"></vshare> -->
    <!-- <button @click="getUser">获取</button> -->
    <!-- <input type="text" @input="input" v-model="inputs">
    <input type="file" id="file" @change="inputChange"> -->
    <!-- <wx-open-launch-weapp id="launch-btn" username="gh_3547ec19af8c" path="pages/index/index.html?user=123&action=abc" >
      <script type="text/wxtag-template">
        <style>.btn { padding: 12px; }</style>
        <button class="btn">打开小程序1</button>
      </script>
    </wx-open-launch-weapp> -->
    <div class="popup fade-show" :class="{ 'fade-show-close': showPopup0 == 2 }" v-show="showPopup0 != 0"></div>
    <div class="popup rs-fd" :class="{ 'rs-fd-close': showPopup1 == 2 }" v-show="showPopup1 != 0"></div>
    <div class="popup bt-fd" :class="{ 'bt-fd-close': showPopup2 == 2 }" v-show="showPopup2 != 0"></div>
    <div class="popup tb-fd" :class="{ 'tb-fd-close': showPopup3 == 2 }" v-show="showPopup3 != 0"></div>
    <div class="popup lr-fd" :class="{ 'lr-fd-close': showPopup4 == 2 }" v-show="showPopup4 != 0"></div>
    <div class="popup rl-fd" :class="{ 'rl-fd-close': showPopup5 == 2 }" v-show="showPopup5 != 0"></div>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Shake from 'shake.js'
import wx from "weixin-js-sdk"
import Scroll from 'base/scroll/scroll.vue'
// import Shake from "assets/js/shake.js"
import Tab from "components/tab.vue"
import EXIF from "exif-js"
import { isSystem, getQueryString, setPageScrollTop, getBrowserEnvironment, loadScript, getDate, getOrientation, showHidePopup, getFileData } from "assets/js/util"
import { getLocation_qq, getLocation_baidu, getLocation_amap, getIpLocation_juhe, getIpLocation_jisu, getIpLocation_baidu, getIpLocation_k780 } from "assets/js/get-third-party.js"
import MyHeader from "components/header.vue"
import api from 'api/api'
import { shareConfigure, setVueThis } from "assets/js/wx.config"
import { colorHex, colorRgb, rgbaToHsv, triggerEvent, compressImg } from 'assets/js/util'
import { AUTH_URL } from "api/project.config"
import pdf from "vue-pdf"
import Pdfh5 from "pdfh5"
var myChart_one, myChart_two, myChart_three
export default {
  name: "",
  data() {
    return {
      pageTitle: "关于我们",
      inputs: '',
      inputImg: '',
      obj: { song: 377 },
      imgs: require("../assets/images/poster_02.png"),
      isVideo: false,
      popupIndex: 0,
      showPopup0: 0,
      showPopup1: 0,
      showPopup2: 0,
      showPopup3: 0,
      showPopup4: 0,
      showPopup5: 0,
      showPopup6: 0,
      appid: 'wx2fbd0f121ad7f27b',
      secret: '788eee27241b4653a2ae2b71fdd21505',
      isSelect: false
    }
  },
  created() {
    console.log("getQueryString('code')", getQueryString('code'))
    getLocation_qq().then(res => {
      console.log("【用户当前位置信息】", res)
    })
  },
  computed: {
    
  },
  destroyed() {
    
  },
  mounted() {
    setVueThis(this)
    this.getLiveList()
    let _data = {
      img: [
      "sanyuan/74f6d71f-8812-4a37-8dbf-df939ef3b3ab.png", "sanyuan/b9b77b63-36a5-49ac-bc80-2e0021d82c6c.png",
      "sanyuan/184639a4-32d3-417d-be39-455c0722db5d.png", "sanyuan/30fdf9bf-bf2a-4249-812f-9eb450db7dfc.jpeg",
      "sanyuan/be81997d-20c2-4b7c-9250-50f5388505a5.jpeg", "sanyuan/d2e34860-4b26-4f87-97f5-cae05ccbf7ac.png",
      "sanyuan/8911fc3e-a60f-4f7c-9025-b666e5805845.jpeg","sanyuan/6f12a61f-4860-470a-a295-c6630b7276a7.png",
      "sanyuan/34b6e91a-9845-458f-8592-2f839f381e27.png","sanyuan/2cccb849-e1ea-47cc-afd5-4b71e7073b0a.jpeg",
      "sanyuan/7e2f1ec9-8f62-4c5b-9273-16016104b31f.jpeg","sanyuan/62f0f7e0-b0db-44f3-8525-2b6fe1509dae.jpeg",
      "sanyuan/238c9f49-69ec-4b54-a2b0-d827e0b7bac8.jpeg","sanyuan/77d7dc43-cdd1-4d8c-b220-ab81cedc0a78.jpeg",
      "sanyuan/68695b4e-012e-46b9-8b54-f4ef0beb2a87.jpeg"],
      txt: ["欢迎来到dd的展览馆", "策展人 | 扬帆", "男宝 | dd | 2岁", "dd的展"]
    }
    let _data2 = {
      img: [
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg", "https://img.vrupup.com/web/szq/images/img_01.jpg",
      "https://img.vrupup.com/web/szq/images/img_01.jpg"
      ],
      txt: ["欢迎来到dd的展览馆", "策展人 | 扬帆", "男宝 | dd | 2岁", "dd的展"]
    }
    // api.getVideo(_data2).then(res => {
    //   console.log("【返回的视频】", res)
    // })
    // let _video = this.$refs.video
    // console.log("_video", _video)
    // _video.play()
    // setTimeout(() => {
    //   let _videoBtn = this.$refs.videoBtn
    //   console.log("_videoBtn", _videoBtn)
    //   triggerEvent(_videoBtn)
    // }, 6000)

    // compressImg("https://img.vrupup.com/web/szq/images/img_29.jpg", .2, .2).then(res => {
    //   console.log("压缩后的图片", res)
    //   this.inputImg = res.base64
    // })
    // compressImg(require('assets/images/img_29.jpg'), .2, .2).then(res => {
    //   console.log("本地压缩后的图片", res)
    //   this.inputImg = res.base64
    // })
  },
  watch: {
    
  },
  // beforeRouteEnter (to,from,next) {
  //   console.log(to,from,next)
  // },
  methods: {
    //点击方块
    selectBox(e, item) {
      console.log("e, item", e, item)
      let _dom = this.$refs['box' + item][0], _boxOk = this.$refs.boxOk
      let _domPosition = _dom.getBoundingClientRect(), _boxOkPosition = _boxOk.getBoundingClientRect()
      this.isSelect = true
      _dom.style.opacity = '1'
      _dom.style.left = _domPosition.x + 'px'
      _dom.style.top = _domPosition.y + 'px'
      _dom.style.margin = '0px'
      _dom.style.position = 'fixed'
      _dom.style.zIndex = '10'
      setTimeout(() => {
        _dom.style.left = _boxOkPosition.x  + 2 + 'px'
        _dom.style.top = _boxOkPosition.y + 2 + 'px'
      }, 500)
    },
    //input事件
    inputChange2(e) {
      getFileData(e.target.files[0]).then(res => {
        console.log("【转换的图片】", res)
        compressImg(res.base64, .2, .2).then(res => {
          console.log("压缩后的图片", res)
          this.inputImg = res.base64
        })
      })    
      // compressImg(e.target.files[0], .2, .2).then(res => {
      //   console.log("压缩后的图片", res)
      //   this.inputImg = res.base64
      // })
    },
    //播放视频
    // playVideo() {
    //   let _video = this.$refs.video
    //   console.log("_video22", _video)
    //   _video.play()
    // },
    //智能客服
    jiaxinTogglerDiv() {
      console.log("jiaxinTogglerDiv", jiaxinTogglerDiv)
      jiaxinTogglerDiv()
    },
    //用户点击分享按钮回调
    clickShareButtonCallback(e) {
      console.log("【在‘我的’组件中点击分享回调】", e)
    },
    startSearchBeacons() {
      console.log("wx", wx)
      console.log("wx.startSearchBeacons", wx.startSearchBeacons)
      // 蓝牙扫描接口     
        wx.startSearchBeacons({  
        ticket:"",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面  
        success: function(res){  
            wx.onSearchBeacons({  
            complete:function(data){  
              console.log("【周边蓝牙设备】", data)  
            }  
          });  
        },  
        fail:function(res){
           var errmsg = JSON.stringify(res.errMsg);  
               var arr = errmsg.split(':');  
           var errmsgBody = arr[1];  
           if(errmsgBody.substr(0, 9) == "bluetooth"){  
                alert("蓝牙未打开，请打开后重试！");  
           } else if(errmsgBody.substr(0, 8) == "location"){  
                alert("手机位置未打开，请打开后重试！");  
           }else{  
                alert(JSON.stringify(res));  
           }  
         }  
     });  
    },
    getTest() {
      // api.getPostTest({ _params: { aaa: 555, bbb: 666 } }).then(res => {
      api.getPostTest({ aaa: 555, bbb: 666, url: encodeURIComponent(window.location.href) }).then(res => {
        console.log("res", res)
      })
    },
    getPosition(lat = '28.177728', lon = '112.982669') {
      // api.getPosition({ _params: { location: `${lat},${lon}`} }).then(res => {
      api.getPosition({ location: `${lat},${lon}`, callbackName: 'QQmap', output:'jsonp', key: 'GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ'}).then(res => {
        console.log("【详细地理位置】", res)
        this.add = res.result.address
      })
    },
    getLiveList() {
      api.getLiveList().then(res => {
        console.log("直播列表", res.data.data.list)
      })
    },
    getUser() {
      console.log("getQueryString('code')", getQueryString('code'))
      this.getAccessToken(getQueryString('code'))
    },
    getAccessToken(code) {
      var _data = {
        appid: this.appid,
        secret: this.secret,
        code: code,
        grant_type: 'authorization_code'
      }
      api.getAccessToken(_data).then( res =>{
        console.log("【通过code获取access_token】", res)
        this.getUserInfo(res.access_token, res.openid)
      })
    },
    getUserInfo(access_token, openid) {
      console.log("getQueryString('code')", getQueryString('code'))
      var _data = {
        access_token: access_token,
        openid: openid
      }
      api.getUserInfo("https://api.weixin.qq.com/sns/userinfo", _data, function(res){
        console.log("【获取用户信息】", res)
      })
    },
    // //弹出、关闭弹窗
    showHidePopup(type) {
      showHidePopup(this, 'showPopup0', type)
      // showHidePopup(this, `showPopup${this.popupIndex}`, type)
      // if (type) this.popupIndex >= 5 ? this.popupIndex = 0 : ++this.popupIndex
    },
    inputChange() {
      let files = document.getElementById("file").files[0]
      console.log("files", files)
      getOrientation(files).then(res => {
        console.log("旋转角度1", res)
      })
      console.log("EXIF", EXIF)
      EXIF.getData(files, function(){
        console.log("图片信息", EXIF.getAllTags(this));
        console.log("旋转角度2", EXIF.getTag(this, 'Orientation'));
      });
    },
     change() {
        console.log("【changechange】", this.inputs)
     },
     input() {
       console.log("【inputinput】", this.inputs)
       api.getCompanyName({ key: this.inputs, _: getDate().timeStamp}).then(res => {
         console.log("公司名", res.data.data)
       })
     },
     scroll(e) {
       console.log("【滚动】", e)
     },
     pulldown(e) {
       console.log("【下拉刷新】", e)
     },
     pullup(e) {
       console.log("【上拉加载】", e)
     },
    // 摇动的回调函数
    shakeEventDidOccur() {
      console.log("摇一摇")
      alert("中奖啦")
      // 获取音频标签
      // let audio = this.$refs.shakeAudio
      // if (window.navigator.vibrate) {
      //   navigator.vibrate(500)
      // }
      // 播放音频
      // audio.play()
    },
    modifyShare() {
      shareConfigure({
        Title: "我是百度",
        ShareUrl: `${AUTH_URL}?song=377677616`,
        Desc: "我是百度我是百度我是百度我是百度",
        ShareImage:
          "http://game.flyh5.cn/resources/game/wechat/szq/images/img_04.jpg"
      })
        .then(res => {
          console.log("【分享成功】", res);
        })
        .catch(err => {
          console.log("【分享失败】", err);
        });
    },
    setObj() {
      this.obj.song = 377677
      this.obj.zi = 5555
      console.log("this.obj", this.obj)
    }
  },

  components: {
    Tab,
    Scroll,
    MyHeader,
    pdf
  }
};
</script>

<style scoped>
#launch-btn{width: 300px;height: 100px;background: green;}
.body{text-align: center;}
.p-box{padding:0 5%;font-size: .3rem;line-height: 1.2;text-align: justify;}
.video-play{position: fixed;left:38%;bottom:20vh;z-index: 555;}
.destination{height: 300px;}
.destination .destination-box{width:100px;height: 100px;border:2px solid #aaa;}
.destination-scroll{border:2px solid #ddd;overflow-x: auto;margin:0 auto 100px;border-left:none;border-right:none;}
.destination-scroll .scroll-box{width:max-content;}
.destination-scroll .scroll-box.on .item{opacity: 0;}
.destination-scroll .item{width:100px;height: 100px;background: #aaa;margin:10px;flex-shrink: 0;line-height: 100px;font-size: 20px;color:#fff;transition:left 1s, top 1s, opacity .5s;}
/* .body{background: red;} */
/* .video-con{position: fixed;width: 100vw;height: 100vh;z-index: 200;background: green;opacity: .5;left:0;top:0;}
video{width:100vw;height: 100vh;position: fixed;left:0;top:0;z-index: 999;background: #000;object-fit: fill;z-index: 100;} */
/* video,
embed {
  width: 5.4rem;
  height: 3.5rem;
  display: block;
  margin: 0 auto;
  background: red;
} */
/* #video2{z-index: 90;}
#video3{z-index: 80;}
#video4{z-index: 70;}
#video5{z-index: 60;}
#video6{z-index: 50;} */
/* .body{padding:0 .5rem;} */
video.on {
  z-index: 200 !important;
}
#demo svg{
  height: calc(100vh) !important;
}
/* video{width: 100%;height: 4rem;} */
#pro {
  padding: 0.6rem;
  background: #fff;
  font-size: 0.3rem; 
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
#mainVideo .about {
  background: #fff;
  padding-bottom: 1rem;
}
.h5 {
  text-align: center;
  font-size: 20px;
}
.box {
  height: 200px;
}
.input {
  margin: 0.4rem 0;
}
input {
  height: 0.6rem;
  border: 1px solid #ddd;
  width: 100%;
}
.times {
  text-align: center;
  font-size: 0.5rem;
  padding: 0.3rem 0 0.3rem;
}
button, ul li,
a {
  display: block;
  width: 2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  margin: 0.3rem auto;
  background: #ccc;
}
audio {
  display: block;
  margin: 0.3rem auto;
}
#myCanvas {
  width: 750px;
  height: 1480px;
}
.poster {
  width: 100%;
}
.pdf-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 555;
  background: #aaa;
}
.my-echarts div{width:33.33%;background: #23AAF2;width:100%;height: 300px;}
.my-echarts div:nth-child(2){background: #DC4C40;}
.my-echarts div:nth-child(3){background: #EB9842;}
video{width: 100vw;height: 100vh;object-fit: cover;background: #000;}
.video-box{position: fixed;width:100%;height: 100%;background: rgba(0,0,0,.7);z-index: 100;left:0;top:100vh;transition: all .5s;}
.video-box.on{top:0;}
.video-box video{width:100%;}
.box{height: 300px;overflow: hidden;margin-top: 50px;}
.box div{line-height: 1.5;font-size: 20px;text-align: center;}
input{padding-left: .2rem;}
.popup{width:60vw;height: 300px;background: green;border-radius: 10px;position: absolute;left:20vw;top:100px;}
</style>