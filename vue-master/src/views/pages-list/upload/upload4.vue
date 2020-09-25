<template>
  <div class="body upload">
    <My-Header :title="pageTitle"></My-Header>
    <div class="con">
      <div class="input-box flex-cen">
        <span>点击上传</span>
        <input id="file" accept="video/*" type="file" ref="file" />
      </div>
      <div class="play" v-show="videoSrc" @click="playVideo">点击播放</div>
      <div class="video-box" :class="{ 'on': isShowVideo }">
        <video id="video" :src="videoSrc"></video>
        <div class="close" @click="playVideo"><span class="iconfont icon-guanbi"></span></div>
      </div>
    </div>
    <!-- <input hidden type="file" multiple id="file" ref="file" /> -->
    <show-modal :showModal="showModal"></show-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import ShowModal from "base/showModal/showModal"
import MyHeader from "components/header.vue"
import { randomString } from 'assets/js/util'
import COS from 'cos-js-sdk-v5'
import * as api  from "api/api"
export default {
  name: "",
  data() {
    return {
      pageTitle: "腾讯云分块上传大文件",//页面标题
      showModal: {//loading弹窗
        isShowModal: false,
        isIcon: true,
        title: "上传中"
      },
      cosOption: {//cos初始化配置参数
        Bucket: 'songziquan-1300394686',
        Region: 'ap-chengdu'/* 存储桶所在地域，必须字段 */
      },
      Key: '',//上传视频文件名
      videoSrc: '',//视频地址
      isShowVideo: false//显示、隐藏视频弹窗
    };
  },
  created() {
    this.cosInit()
  },
  mounted() {
    this.selects()
  },
  methods: {
    //点击播放视频
    playVideo() {
      let _video = document.getElementById("video")
      this.isShowVideo = !this.isShowVideo
      if (!this.isShowVideo) {
        _video.pause()
      } else {
        _video.play()
      }
    },
    //点击选择文件
    selects() {
      let file = this.$refs.file
      // file.click()
      file.addEventListener("change", () => {
        let _file = file.files[0]
        this.Key = `${randomString(16)}.${_file.name.split('.')[_file.name.split('.').length - 1]}`
        console.log("【文件名】", this.Key)
        this.multipartUpload(_file)
      })
    },
    //cos初始化
    cosInit() {
      let _this = this
      this.cos = new COS({ getAuthorization(options = _this.cosOption, callback) {
        // 异步获取临时密钥
        api.getCredentials({ bucket: options.Bucket, region: options.Region }).then(res => {
          console.log("【异步获取临时密钥】", res) 
          let { TmpSecretId, TmpSecretKey, Token, start_time, ExpiredTime } = res.data.data
          console.log("TmpSecretId-->", TmpSecretId)
          console.log("TmpSecretKey-->", TmpSecretKey)
          console.log("Token-->", Token)
          console.log("start_time-->", start_time)
          console.log("ExpiredTime-->", ExpiredTime)
          // if (!res.data || !credentials) return console.error('credentials invalid')
          callback({
            TmpSecretId: TmpSecretId,
            TmpSecretKey: TmpSecretKey,
            XCosSecurityToken: Token,
            StartTime: start_time,
            ExpiredTime: ExpiredTime
          })
        })
      }})
    },
    //上传分块(高级接口)
    multipartUpload(fileObject) {
      let _this = this
      this.cos.sliceUploadFile({
        Bucket: this.cosOption.Bucket,
        Region: this.cosOption.Region,
        Key: this.Key,
        Body: fileObject,
        onTaskReady(taskId) {
          console.log("taskId", taskId)
        },
        onHashProgress(progressData) {
          console.log("progressData", progressData)
        },
        onProgress(progressData) {
          console.log("【上传进度】", progressData)
          _this.myShowModal( `${parseInt(progressData.percent * 100)}%`, true, true)
        }
      }, (err, data) => {
        console.log("err", err)
        console.log("data", data)
        if (data) {
          _this.transcoding(`https://${data.Location}`).then(res => {
            this.videoSrc = res
            setTimeout(function() { _this.myShowModal(false) }, 700)
          })
        }
      })
    },
    //视频转码
    async transcoding(url) {
      if (url.includes('.mp4') || url.includes('.mp4')) return url
      let data = {
        videourl: url,
        videoname: url.split('.com/')[1]
      }
      let videoSrcapi = await api.transcoding(data)
      console.log("videoSrcapi", videoSrcapi)
      return videoSrcapi.data.data
    },
    //loading弹窗
    myShowModal(title, duration = 2000, icon = false) {
      if (typeof title == "boolean" && !title) {
        this.showModal.isShowModal = false
        return
      }
      this.showModal.isShowModal = true
      this.showModal.title = title
      this.showModal.isIcon = icon
      if (typeof duration == "boolean" && duration) return;
      setTimeout(() => {
        this.showModal.isShowModal = false
      }, duration)
    }
  },
  components: {
    ShowModal,
    MyHeader
  }
};
</script>
<style scoped>
body{background: #eee;}
.input-box{width:3rem;height:3rem;border-radius:50%;background: #159F5C;position:relative;overflow:hidden;font-size: .4rem;color:#fff;margin:100px auto 0;}
.input-box input{position: absolute;width:100%;height: 100%;border-radius: 50%;opacity: 0;}
.video-box{width:100vw;height:calc(100vh - .92rem);position: fixed;left:0;top:calc(100vh);transition: all .5s;background: #222;}
.video-box video{width: 100%;height:100%;object-fit: cover;}
.video-box.on{top:.92rem;}
.play{text-align: center;font-size: .32rem;width:100px;height:.8rem;border-radius: .1rem;background: #1CA261;line-height: .8rem;color:#fff;margin: 50px auto 0;}
.video-box .close{font-size: .8rem;color:#fff;position:absolute;top:0;right:0;padding:0 .2rem;z-index: 500;}
.video-box .close span{font-size: .6rem;font-weight: bold;}
.h5{word-break: break-word;margin: .4rem;}
</style>