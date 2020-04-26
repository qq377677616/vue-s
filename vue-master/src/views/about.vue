<template>
  <div class="body about">
    <My-Header :title="pageTitle" :isBack="false"></My-Header>
    <!-- <iframe id="iframe" src="http://game.flyh5.cn/resources/game/wechat/szq/demo/iframe.html" frameborder="0"></iframe>  -->
    <!-- <iframe :class="{'bottom-top': isVideo}" id="iframe" src='http://player.youku.com/embed/XMjg1NzA5NDY4NA==' frameborder=0 allowfullscreen></iframe> -->
    <!-- <video id="mainVideo" src="../assets/images/video.mp4" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload @loadstart="loadstart" @durationchange="durationchange" @loadedmetadata="loadedmetadata" @loadeddata="loadeddata" @progress="progress" @canplay="canplay" @canplaythrough="canplaythrough"></video> -->
    <!-- <div id="pro">{{aaa}}</div> -->
    <!-- <video :class="{'on': playIndex == 2}" src="../assets/images/1.mp4" id="video1" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>
    <video :class="{'on': playIndex == 3}" :src="src2" id="video2" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>
    <video :class="{'on': playIndex == 4}" :src="src3" id="video3" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>
    <video :class="{'on': playIndex == 5}" :src="src4" id="video4" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>
    <video :class="{'on': playIndex == 6}" :src="src5" id="video5" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>
    <video :class="{'on': playIndex == 7}" :src="src6" id="video6" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video>-->
    <!-- <div class="video-con" @click="playVideo" v-show="isPlay"></div> -->
    <!-- <video src="http://game.flyh5.cn/resources/game/wechat/szq/images/video_05.mp4" id="video6" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-orientation="portrait" x5-video-player-fullscreen="true" controls preload></video> -->
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
    <!-- <div class="pdf-box">
      <pdf src="https://game.flyh5.cn/resources/game/wechat/szq/images/pdf_01.pdf" :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler" ref="wrapper" class="pdf"></pdf>
      <ul class="footers">
        <li :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
          <p>放大</p>
        </li>
        <li :class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
          <p>缩小</p>
        </li>
        <li
          :class="{select:idx==2}"
          @touchstart="idx=2"
          @touchend="idx=-1"
          @click="changePdfPage(0)"
        >
          <p>上一页</p>
        </li>
        <li
          :class="{select:idx==3}"
          @touchstart="idx=3"
          @touchend="idx=-1"
          @click="changePdfPage(1)"
        >
          <p>下一页</p>
        </li>
      </ul>
    </div> -->
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
import wx from "weixin-js-sdk";
import Shake from "assets/js/shake.js";
import Tab from "components/tab.vue";
import { setPageScrollTop, getBrowserEnvironment } from "assets/js/util";
import {
  getLocation_qq,
  getLocation_baidu,
  getLocation_amap,
  getIpLocation_juhe,
  getIpLocation_jisu,
  getIpLocation_baidu,
  getIpLocation_k780
} from "assets/js/get-third-party.js";
import MyHeader from "components/header.vue";
import {
  uploadAudio,
  getIpLocation,
  getWxConfig,
  getProjectConfig,
  getPostTest,
  getTest,
} from "api/api";
// import { shareConfigure, getUserInfo } from "assets/js/wx-config"
// import { AUTH_URL } from "api/config";
import pdf from "vue-pdf"
import Pdfh5 from "pdfh5"

export default {
  name: "",
  data() {
    return {
      imgs: require("../assets/images/poster_02.png"),
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
      pdfh5:  null
    };
  },
  created() {
    getTest().then(res => {
      console.log("res", res)
    })
    // this.alerts()
    // this.getLocation();
    // sessionStorage.setItem("aaa", "【5555555555】");
    // console.log(sessionStorage.getItem("aaa"));
  },
  destroyed() {
    // this.$router.replace("/")
  },
  mounted() {
    // alert(navigator.userAgent)
    // getBrowserEnvironment().then(res => {
    //   console.log("【当前浏览器环境】", res)
    // })
    // WindowsWechat
    // Windows
    // iPhone
    // Android
    // iPad
    // getTest().then(res => {
    //   console.log("[web网站的测试接口]", res)
    // })
    //实例化
 this.pdfh5 = new  Pdfh5("#demo", {
      pdfurl:  "https://game.flyh5.cn/resources/game/wechat/szq/images/pdf_01.pdf",
      lazy:true
  }).on("complete", function (status, msg, time) { //监听完成事件
      console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
   })
    this.pageOk();
    this.pageProgress(() => {
      console.log("加载OK");
    });
    // getUserInfo().then(res => {
    //   console.log("res", res);
    // });
    // this.$toast.loading({ message: "视频加载中", duration: 0, loadingType: "spinner" })
    // setTimeout(() => {
    //   let _vc = document.querySelector(".vc-switch");
    //   _vc.innerHTML = '该版本未上线'
    // }, 100)
    // this.$router.push('/')
    window.onunload = function(e) {
      // e = e || window.event;

      // 兼容IE8和Firefox 4之前的版本
      // if (e) {
      //   e.returnValue = '关闭提示3333';
      // }
      this.$router.replace("/");
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      // return '关闭提示';
    };
    window.addEventListener("beforeunload", function(e) {
      // alert(555)
      // return;
      // //      //不是所有浏览器都支持提示信息的修改
      //      var confirmationMessage = "请先保存您编辑的内容,否则您修改的信息会丢失。";
      //      e.returnValue = confirmationMessage;
      //      alert(4444)
      //      this.$router.replace("/")
      //  return confirmationMessage;
    });
    window.onresize = () => {
      let _aaa = this.aaa;
      _aaa++;
      this.aaa = _aaa;
    };
    // getIpLocation_juhe({ phone: '15707496771' }).then(res => {
    //   console.log("【手机号归属地查询接口返回1】", res)
    //   console.log("【手机号归属地查询接口返回1】", res.data.result)
    // })
    // getIpLocation_jisu({ phone: '15707496771' }).then(res => {
    //   console.log("【手机号归属地查询接口返回2】", res)
    //   console.log("【手机号归属地查询接口返回2】", res.data.result)
    // })
    // getIpLocation_baidu({ phone: '15707496771'}).then(res => {
    //   console.log("【手机号归属地查询接口返回3】", res)
    //   console.log("【手机号归属地查询接口返回3】", res.data.response)
    // })
    // getIpLocation_k780({ phone: '15707496771'}).then(res => {
    //   console.log("【手机号归属地查询接口返回4】", res)
    //   console.log("【手机号归属地查询接口返回4】", res.data.result)
    // })
    // this.getLocation(); // 调用获取地理位置
    // this.getLocation2(); // 调用获取地理位置
    // this.loading()
  },
  computed: {},
  methods: {
    shareOk(res){
      console.log("分享成功分享成功分享成功分享成功分享成功分享成功分享成功", res)
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage(val) {
                if(val === 0 && this.currentPage > 1) {
                    this.currentPage--;
                }
                if(val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++;
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            // pdf加载时
            loadPdfHandler(e) {
                this.currentPage = 1; // 加载的时候先加载第一页
            },
            //放大
            scaleD() {
                this.scale += 5;
                // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
                this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
            },

            //缩小
            scaleX() {
                if(this.scale == 100) {
                    return;
                }
                this.scale += -5;
                this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
                // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
            },
    back() {
      console.log("wxwxwx", wx);
      wx.miniProgram.postMessage({ data: { status: "377677" } });
      wx.miniProgram.redirectTo({ url: "/pages/index/index?status=888" });
    },
    playVideo() {
      if (!this.isPlay) return;
      this.isPlay = false;
      console.log("5555");
      let _this = this;
      let _video1 = document.getElementById("video1");
      let _video2 = document.getElementById("video2");
      let _video3 = document.getElementById("video3");
      let _video4 = document.getElementById("video4");
      let _video5 = document.getElementById("video5");
      let _video6 = document.getElementById("video6");
      console.log("_video1", _video1);
      _video1.play();
      this.src2 = this.src[1];
      this.playIndex++;
      console.log("this.src2", this.src2);
      _video1.onended = () => {
        _video2.play();
        this.src3 = this.src[2];
        this.playIndex++;
      };
      _video2.onended = () => {
        _video3.play();
        this.src4 = this.src[3];
        this.playIndex++;
      };
      _video3.onended = () => {
        _video4.play();
        this.src5 = this.src[4];
        this.playIndex++;
      };
      _video4.onended = () => {
        _video5.play();
        this.src6 = this.src[5];
        this.playIndex++;
      };
      _video5.onended = () => {
        _video6.play();
        //  this.src3 = this.src[6]
      };
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
    pageProgress(callback) {
      setTimeout(() => {
        if (this.pageLoadingOk) {
          this.speed = 50;
          if (this.pro >= 100) {
            this.speed = 9999;
            callback();
          }
        } else if (this.pro == 99) {
          this.speed = 500;
        } else if (this.pro == 95) {
          this.speed += 1000;
        } else if (this.pro == 90) {
          this.speed += 500;
        } else if (this.pro == 75) {
          this.speed += 300;
        } else if (this.pro == 50) {
          this.speed += 150;
        }
        if (
          !this.pageLoadingOk ||
          (this.pageLoadingOk && (this.pro == 99 || this.speed == 50))
        ) {
          if (
            (!this.pageLoadingOk && this.pro < 99) ||
            (this.pageLoadingOk && (this.pro == 99 || this.speed == 50))
          )
            this.pro++;
          this.pageProgress(callback);
        }
      }, this.speed);
    },
    loadstart() {
      console.log("【111】【loadstart】");
    },
    durationchange() {
      console.log("【222】【durationchange】");
    },
    loadedmetadata() {
      console.log("【333】【loadedmetadata】");
    },
    loadeddata() {
      console.log("【444】【loadeddata】");
    },
    progress(e) {
      console.log("【555】【progress】", this.aaa++);
      console.log("【eee】【progress】", e);
    },
    canplay() {
      console.log("【666】【canplay】");
    },
    canplaythrough() {
      this.$toast("视频加载完成");
      console.log("【777】【canplaythrough】");
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
    accSub(num1, num2) {
      var r1, r2, m, n;
      try {
        r1 = num1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = num2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = r1 >= r2 ? r1 : r2;
      return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    },
    // previewImage() {
    //   wx.previewImage({
    //     current: 'https://game.flyh5.cn/resources/game/wechat/szq/code.jpg', // 当前显示图片的http链接
    //     urls: ['https://game.flyh5.cn/resources/game/wechat/szq/code.jpg'] // 需要预览的图片http链接列表
    //   });
    // },
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
</style>