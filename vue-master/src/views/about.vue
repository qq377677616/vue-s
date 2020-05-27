<template>
  <div class="body about">
    <My-Header :title="pageTitle" :isBack="false"></My-Header>
    <div>
      <span v-for="item in odd">{{item}}--</span>
    </div>
    <div>
      <span v-for="item in even">{{item}}--</span>
    </div>
    <input type="text" v-model="inputs" />
    <div>{{inputs}}</div>
    <a href="http://wpa.qq.com/msgrd?v=3&uin=377677616&site=qq&menu=yes" target="_blank">点击发起客服</a>
    <a href="mqqwpa://im/chat?chat_type=wpa&uin=229371229&version=1&src_type=web&web_src=oicqzone.com" target="_blank">点击qq聊天</a>
    <a href="tencent://message/?uin=377677616&version=1&src_type=web&web_src=oicqzone.com" target="_blank">点击qq聊天</a>
    <a href="mqqwpa //im/chat?chat_type=wpa&uin=574201314&version=1" target="_blank">点击qq聊天</a>
    <div class="my-echarts flex">
      <div id="myChart1"></div>
      <div id="myChart2"></div>
      <div id="myChart3"></div>
    </div>
    <a
      href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=123456"
      style="padding:50px;background:green;"
    >QQ临时交流</a>
    <!-- <canvas id="myCanvas"></canvas> -->
    <!-- <img class="poster" :src="poster_img" alt=""> -->
    -->
    <!-- <embed src="http://game.flyh5.cn/resources/game/wechat/szq/images/video_05.mp4"></embed> -->
    <!-- <img style="width:200px;height:500px;" src="https://mmbiz.qpic.cn/mmbiz_jpg/7aKr7Yibs3IW7Cmtum0ckO7qbLTroUzNUFx7tSqicP0CcU0AOiacOsB8U7yUc2raCIicePtBPUVaZZrwfA7zfegNnQ/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt=""> -->
    <button @click="back">返回到小程序</button>
    <button @click="playVideo2">点击播放2</button>
    <div class="times">录制时间：{{times}}s</div>
    <button @click="soundRecording_start">点击录制</button>
    <button @click="soundRecording_stop">停止录制</button>
    <audio :src="myMp3" controls></audio>
    <button @click="openMap">打开地图</button>
    <button @click="isVideo = true">播放视频</button>
    <button @click="modifyShare">修改分享路径</button>
    <button @click="mtah5">腾讯统计</button>
    <a href="https://game.flyh5.cn/resources/game/wechat/szq/images/myword.doc">文件下载</a>
    <a href="https://game.flyh5.cn/resources/game/wechat/szq/images/pdf_01.pdf">查看pdf</a>
    <a href="https://view.officeapps.live.com/op/view.aspx?src=https://game.flyh5.cn/resources/game/wechat/szq/images/pdf_01.pdf">查看pdf2</a>
    <a href="https://game.flyh5.cn/resources/game/wechat/szq/images/ppt.ppt">查看ppt</a>
    <a href="https://view.officeapps.live.com/op/view.aspx?src=https://game.flyh5.cn/resources/game/wechat/szq/images/ppt.ppt">查看ppt2</a>
    <a href="https://game.flyh5.cn/resources/game/wechat/szq/images/doc.doc">查看word</a>
    <a href="https://view.officeapps.live.com/op/view.aspx?src=https://game.flyh5.cn/resources/game/wechat/szq/images/doc.doc">查看word2</a>
    <div class="input">
      <input type="text" />
    </div>
    <img src="http://game.flyh5.cn/resources/game/wechat/szq/images/code_03.jpg" alt />
    <img src="http://game.flyh5.cn/resources/game/wechat/szq/images/code_04.jpg" alt />
    <!-- <div class="h5">{{aaa}}</div> -->
    <div class="box"></div>
    <div class="input">
      <input type="text" @focus="focus" />
    </div>
    <tab></tab>
    <div id="pdf">
      <div id="demo"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk"
import Shake from "assets/js/shake.js"
import Tab from "components/tab.vue"
import { isSystem, getQueryString, setPageScrollTop, getBrowserEnvironment, loadScript } from "assets/js/util"
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
import {
  uploadAudio,
  getIpLocation,
  getWxConfig,
  getProjectConfig,
  getPostTest,
  getTest,
} from "api/api"
// import { shareConfigure, getUserInfo } from "assets/js/wx-config"
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
      imgs: require("../assets/images/poster_02.png"),
      inputs: '555',
      poster_img: "",
      pageTitle: "我的测试",
      status: 0,
      times: 0,
      autoTime: null,
      localIdList: [], //录音本地id列表
      serverIdList: [], //录音服务器id列表
      serverId_index: 0,
      section: [5, 10],
      aaa: 1,
      isVideo: false,
      indexList: ["热", "A", "B", "C"],
      pageLoadingOk: false,
      pro: 1,
      speed: 150,
      // src: [require('../assets/images/1.mp4'), require('../assets/images/2.mp4'), require('../assets/images/3.mp4'), require('../assets/images/4.mp4'), require('../assets/images/5.mp4'), require('../assets/images/6.mp4')],
      src2: "",
      src3: "",
      src4: "",
      src5: "",
      src6: "",
      isPlay: true,
      playIndex: 1,
      myMp3: "", //合成后的mp3
      //pdf
      currentPage: 1,
      pageCount: 0,
      src: "", // pdf文件地址
      scale: 100, //放大系数
      idx: -1,
      clauseTitle: "",
      loadedRatio: 0,
      pdfh5:  null,
      myChart: null,
      song: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  // watch: {
  //   //路由监听
  //   '$route'(to, from) {
  //     alert(getQueryString("a"))
  //   }
  // },
  created() {
    // loadScript("http://w10.ttkefu.com/k/?fid=8B1HFFI3").then(res => {
    //   console.log("kkkefu加载完成")
    // })
    // setTimeout(() => {
    //   console.log(6666)
    //   setPageScrollTop(0)
    // }, 2000)
    // getTest().then(res => {
    //   console.log("res", res)
    // })
    // this.alerts()
    // this.getLocation();
    // sessionStorage.setItem("aaa", "【5555555555】");
    // console.log(sessionStorage.getItem("aaa"));
  },
  computed: {
    odd() {
      return this.song.filter((item, index) => {
        if (index % 2 == 0 ) return item
      })
    },
    even() {
      return this.song.filter((item, index) => {
        if (index % 2 != 0 ) return item
      })
    }
  },
  destroyed() {
    
  },
  mounted() {
    //判断数组中是否包含某字符串
  Array.prototype.contains = function(needle) {
    for (i in this) {
      if (this[i].indexOf(needle) > 0)
        return i;
    }
    return -1;
  }
 
  var device_type = navigator.userAgent; //获取userAgent信息
  // document.write(device_type); //打印到页面
  console.log("MobileDetect", MobileDetect)
  var md = new MobileDetect(device_type); //初始化mobile-detect
  var os = md.os(); //获取系统
  console.log(os)
  var model = "";
  if (os == "iOS") { //ios系统的处理
    os = +md.version("iPhone");
    console.log(os)
    model = md.mobile();
  } else if (os == "AndroidOS") { //Android系统的处理
    os = md.os() + md.version("Android");
    var sss = device_type.split(";");
    var i = sss.contains("Build/");
    if (i > -1) {
      model = sss[i].substring(0, sss[i].indexOf("Build/"));
    }
  }
  // alert(os + "---" + model);//打印系统版本和手机型号
    isSystem().then(res => {
      let _system = res.system.toLowerCase()
      if (_system.toLowerCase().indexOf("al00a") != -1 || _system.toLowerCase().indexOf("al00ta") != -1 || _system.indexOf("huawei")) {
        let _input = document.getElementsByClassName("van-uploader__input")[0]
        _input.setAttribute("capture", "camcorder")
      }
    })
    setTimeout(() => {
      this.song.push(11, 12, 13, 14, 15, 16, 17)
    }, 3000)
  },
  watch: {
    option3: {
      deep: true,
      handler: function (newVal, oldVal) {
        myChart_one.setOption(newVal, true)
      }
    }
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        myChart_one = this.$echarts.init(document.getElementById('myChart1'))
        myChart_one.setOption(this.option3);
         myChart_two = this.$echarts.init(document.getElementById('myChart2'))
        myChart_two.setOption(this.option2);
         myChart_three = this.$echarts.init(document.getElementById('myChart3'))
        myChart_three.setOption(this.option2);
    },
    //为图表计算高度
    chartssize(container, charts) {
      function getStyle(el, name)
      {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }
      let wi = getStyle(container, 'width').width;
      let hi = getStyle(container, 'height').height;
      myChart_one.style.height = hi
      myChart_two.style.height = hi
      myChart_three.style.height = hi
    },
    shareOk(res){
      console.log("分享成功分享成功分享成功分享成功分享成功分享成功分享成功", res)
    },
    back() {
      console.log("wxwxwx", wx);
      wx.miniProgram.postMessage({ data: { status: "377677" } });
      wx.miniProgram.redirectTo({ url: "/pages/index/index?status=888" });
    },
    playVideo2() {
      let _video2 = document.getElementById("video1");
      _video2.play();
    },
    pageOk() {
      setTimeout(() => {
        this.pageLoadingOk = true;
      }, 4000);
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
    mtah5() {
      console.log("MtaH52", MtaH5);
      MtaH5.clickStat("page1_btn1");
    },
    loading(ele, ele2, speed, callback) {
      //加载进度条
      // $(ele2).animate({ 'width': '0%' }, 0).animate({ 'width': '33%' }, speed * 2).animate({ 'width': '66%' }, speed * 2).animate({ 'width': '100%' }, speed * 3);
      let _num = 0;
      setInterval(function() {
        _num++;
        console.log(_num);
      }, 100);
    },
    getLocation() {
      // getMap()
      getLocation_qq().then(res => {
        console.log("【腾讯定位信息】", res);
      });
      // getLocation_baidu().then(res => {
      //   console.log("【百度定位信息】", res)
      // })
      // getLocation_amap().then(res => {
      //   console.log("【高德定位信息】", res)
      // })
    },
    focus() {
      setTimeout(() => {
        window.screenHeight = document.body.clientHeight;
        setPageScrollTop(document.body.scrollHeight);
      }, 500);
    },
    openMap() {
      console.log("【打开地图】");
      wx.openLocation({
        latitude: 28.179474, // 纬度，浮点数，范围为90 ~ -90
        longitude: 112.988696, // 经度，浮点数，范围为180 ~ -180。
        name: "377677", // 位置名
        address: "377677616", // 地址详情说明
        scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    /**获取地图定位*/
    // getLocation2() {
    //   let geolocation = location.initMap("map-container"); //定位
    //   console.log("geolocation", geolocation)
    //   AMap.event.addListener(geolocation, "complete", result => {
    //     console.log("【高德地图定位信息的返回】", result);
    //   });
    // },
    alerts() {
      if (
        process.env.NODE_ENV === "production" ||
        !window.location.href.includes("156")
      ) {
        this.$dialog
          .alert({
            title: "测试页面",
            message: "此页面为测试页面，点击确认退出"
          })
          .then(() => {
            this.$router.replace("/");
          });
      }
    },
    //开始录音
    soundRecording_start() {
      var _this = this;
      wx.startRecord({
        success: function(res) {
          console.log("开始录音了");
          console.log(res);
        },
        fail: function(res) {
          //录音失败
          console.log("录音失败", res);
        },
        complete: function(res) {
          console.log("res", res);
          // _this.localIdList.push(res.localId)
          // _this.soundRecording_start()
        }
      });
    },
    //停止录音
    soundRecording_stop() {
      let _this = this;
      wx.stopRecord({
        success: function(res) {
          console.log("res.localId", res.localId)
        },
        fail: function(err) {
          console.log(err);
        }
      });
    },
    //上传合成音频
    synthesis() {
      let _this = this;
      console.log("音频本地id列表", _this.localIdList);
      _this.uploadVoice(() => {
        console.log("音频服务器id列表", _this.serverIdList);
        let _data = {
          // media_id: JSON.stringify(_this.serverIdList)
          media_id: _this.serverIdList,
          ab: "555"
        };
        console.log("传给后台的id列表数据：", _data);
        uploadAudio(_data).then(res => {
          console.log("合成mp3接口的返回：");
          console.log(res);
          _this.myMp3 = res.data.data;
          console.log("最后的mp3", _this.myMp3);
        });
      });
    },
    //本地语音转换成mp3
    transformMp3(callback) {
      var _url = this.requestUrl + "/jan_blessing_tdw/api.php?a=ret_mp3";
      this.uploadVoice(function(res) {
        $.post(
          _url,
          {
            media_id: res,
            authorizer_access_token: sessionStorage.getItem(
              "authorizer_access_token"
            )
          },
          function(res) {
            callback(res);
          }
        );
      });
    },
    //上传语音接口
    uploadVoice(callback) {
      var _this = this;
      wx.uploadVoice({
        localId: _this.localIdList[_this.serverId_index], // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          _this.serverIdList.push(res.serverId); // 返回音频的服务器端ID
          _this.serverId_index++;
          if (_this.serverId_index < _this.localIdList.length) {
            _this.uploadVoice(callback);
          } else {
            callback();
          }
        }
      });
    }
    // uploadVoice(callback) {
    //   var _this = this;
    //   wx.uploadVoice({
    //     localId: _this.myVoice, // 需要上传的音频的本地ID，由stopRecord接口获得
    //     isShowProgressTips: 1, // 默认为1，显示进度提示
    //     success: function (res) {
    //       var serverId = res.serverId; // 返回音频的服务器端ID
    //       if (callback) {
    //         _this.serverId = serverId;
    //         callback(serverId);
    //       }
    //     }
    //   });
    // }
  },

  components: {
    Tab,
    MyHeader,
    pdf
  }
};
</script>

<style scoped>
/* .body{background: red;} */
/* .video-con{position: fixed;width: 100vw;height: 100vh;z-index: 200;background: green;opacity: .5;left:0;top:0;}
video{width:100vw;height: 100vh;position: fixed;left:0;top:0;z-index: 999;background: #000;object-fit: fill;z-index: 100;} */
video,
embed {
  width: 5.4rem;
  height: 3.5rem;
  display: block;
  margin: 0 auto;
  background: red;
}
/* #video2{z-index: 90;}
#video3{z-index: 80;}
#video4{z-index: 70;}
#video5{z-index: 60;}
#video6{z-index: 50;} */
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
</style>