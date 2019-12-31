<template>
  <div class="body about">
    <!-- <My-Header :title="pageTitle" :isBack="false"></My-Header> -->
    <div class="times">录制时间：{{times}}s</div>
    <button @click="soundRecording_start">点击录制</button>
    <button @click="soundRecording_stop(0)">停止录制{{accSub(0.03, 0.01)}}</button>
    <!-- <button @click="synthesis">合成音频</button> -->
    <audio :src="myMp3" controls></audio>
    <tab></tab>
    <!-- <img src="https://game.flyh5.cn/resources/game/wechat/szq/code.jpg" alt="" @click="previewImage"> -->
  </div>
</template>

<script type="text/ecmascript-6">
import wx from "weixin-js-sdk";
import Shake from "assets/js/shake.js";
import Tab from "components/tab.vue";
import MyHeader from "components/header.vue";
import {
  getIpLocation,
  getWxConfig,
  getProjectConfig,
  getPostTest,
  getTest
} from "api/request.js";
export default {
  name: "",
  data() {
    return {
      pageTitle: "我的测试",
      status: 0,
      times: 0,
      autoTime: null,
      localIdList: [], //录音本地id列表
      serverIdList: [], //录音服务器id列表
      serverId_index: 0,
      section: [5, 10],
      myMp3: "" //合成后的mp3
    };
  },
  mounted() {
    // getPostTest({ bis_id: 8 }).then(res => {
    //   console.log("res", res)
    // })
    getProjectConfig().then(res => {
      console.log(res.data.data.status);
      let _data = JSON.parse(decodeURIComponent(res.data.data.content.info));
      console.log(_data);
    });
  },
  mounted() {
    getTest({
      "X-Access-Token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjcsIm5vdyI6MTU3NzY4NDU4Mjg4OSwic3RycyI6WyJjb21wYW55X3Njb3BlIiwiZ2w4c2wiXSwidHlwZSI6MiwidXUiOiIxN2NiMWZmOC0wZWQyLTQ0MTEtODA1YS0xMTMyNzU2NGY4OTYifQ.aJfiTZoPrpzUJKfRbnJ_d7nN-iZbLQmv7iK7j0KMNm4"
    }).then(res => {
      console.log("res", res);
    });
  },
  computed: {
    // accSub(num1,num2){
    //   var r1,r2,m,n;
    //   try{
    //     r1 = num1.toString().split('.')[1].length;
    //   }catch(e){
    //       r1 = 0;
    //   }
    //   try{
    //       r2=num2.toString().split(".")[1].length;
    //   }catch(e){
    //       r2=0;
    //   }
    //   m=Math.pow(10,Math.max(r1,r2));
    //   n=(r1>=r2)?r1:r2;
    //   return (Math.round(num1*m-num2*m)/m).toFixed(n);
    // }
  },
  methods: {
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
      // if (this.status != 0) return
      console.log("【点击了录音按钮】");
      console.log("微信jssdk:", wx);
      var _this = this;
      wx.startRecord({
        success: function(res) {
          if (!_this.autoTime) {
            _this.autoTime = setInterval(() => {
              if (
                _this.times > _this.section[0] &&
                _this.times % _this.section[1] == 0
              ) {
                _this.soundRecording_stop(1);
              }
              _this.times++;
            }, 1000);
          }
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
    soundRecording_stop(type) {
      console.log("【点击了停止录制按钮type】", type);
      let _this = this;
      wx.stopRecord({
        success: function(res) {
          _this.localIdList.push(res.localId);
          if (type == 1) {
            console.log("【分段】");
            _this.soundRecording_start();
          } else {
            console.log("录制暂停了");
            clearInterval(_this.autoTime);
            _this.synthesis();
          }
        },
        fail: function(err) {
          console.log(err);
        }
      });
    },
    //上传合成音频
    synthesis() {
      let _this = this;
      console.log("本地id列表", _this.localIdList);
      _this.uploadVoice(() => {
        console.log("服务器id列表", _this.serverIdList);
        let _data = {
          // a: "upload",
          // media_id: JSON.stringify(_this.serverIdList)
          media_id: _this.serverIdList.join(","),
          // media_id: "123456",
          ab: "555",
          bd: "888"
          // media_id: _this.serverIdList[0]
        };
        console.log("传给后台的id列表数据：", _data);
        getAudio(_data).then(res => {
          console.log("合成mp3接口的返回：");
          console.log(res);
          _this.myMp3 = res.data.url;
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
    MyHeader
  }
};
</script>

<style scoped>
.about {
  background: #fff;
}
.times {
  text-align: center;
  font-size: 0.5rem;
  padding: 2rem 0 0.3rem;
}
button {
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
</style>