<template>
  <div class="body about">
    <My-Header :title="pageTitle" :isBack="false"></My-Header>
    <button @click="modifyShare">修改分享路径</button>
    <img src="http://game.flyh5.cn/resources/game/wechat/szq/images/my-code_01.jpg" style="opacity:0;" />
    <button @click="showHidePopup()">显示弹窗</button>
    <button @click="showHidePopup(true)">隐藏弹窗</button>
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


    <!-- <div class="scroll-box">
      <scroll class="box" @scroll="scroll" @pulldown="pulldown" @pullup="pullup">
        <div>
          <div v-for="item in 30" :key="item">这是内容这是内容这是内容这是内容这是内容这是内容这是内容{{item}}</div>
        </div>
      </scroll>
    </div> -->
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Shake from 'shake.js'  // es6的方式导入
import wx from "weixin-js-sdk"
import Scroll from 'base/scroll/scroll.vue'
// import Shake from "assets/js/shake.js"
import Tab from "components/tab.vue"
import EXIF from "exif-js"
import { isSystem, getQueryString, setPageScrollTop, getBrowserEnvironment, loadScript, getDate, getOrientation, showHidePopup } from "assets/js/util"
import {
  getLocation_qq,
  getLocation_baidu,
  getLocation_amap,
  getIpLocation_juhe,
  getIpLocation_jisu,
  getIpLocation_baidu,
  getIpLocation_k780
} from "assets/js/get-third-party.js"
import MyHeader from "components/header.vue"
// import {
//   uploadAudio,
//   getIpLocation,
//   getWxConfig, 
//   getProjectConfig,
//   getPostTest,
//   getTest,
//   getCompanyName,
//   getTeam,
//   getGrab
// } from "api/api"
import api from 'api/api'
import { shareConfigure, getUserInfo } from "assets/js/wx.config"
// import { AUTH_URL } from "api/config";
import pdf from "vue-pdf"
import Pdfh5 from "pdfh5"
// import { isMobile } from 'mobile-device-detect'
// import { MobileDetect } from 'mobile-detect'
var myChart_one, myChart_two, myChart_three
export default {
  name: "",
  data() {
    return {
      pageTitle: "关于我们",
      inputs: '',
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
      secret: '788eee27241b4653a2ae2b71fdd21505'
    }
  },
  created() {
    console.log("getQueryString('code')", getQueryString('code'))
  },
  computed: {
    
  },
  destroyed() {
    
  },
  mounted() {
    // getTeam().then(res => {
    //   console.log("res", res)
    // })
    // setTimeout(() => {
    //   getBrowserEnvironment().then(res => {
    //   console.log(res)
    //   })
    // }, 5000)
  },
  watch: {
    
  },
  methods: {
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
.body{padding:0 .5rem;}
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
  height: 5rem;
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
.video-box{position: fixed;width:100%;height: 100%;background: rgba(0,0,0,.7);z-index: 100;left:0;top:100vh;transition: all .5s;}
.video-box.on{top:0;}
.video-box video{width:100%;}
.box{height: 500px;overflow: hidden;}
.box div{line-height: 1.5;font-size: 20px;text-align: center;}
input{padding-left: .2rem;}
.popup{width:60vw;height: 300px;background: green;border-radius: 10px;position: absolute;left:20vw;top:100px;}
</style>