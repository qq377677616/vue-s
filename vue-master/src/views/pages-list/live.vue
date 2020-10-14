<template>
  <div>
    <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
    <VTcPlayer ref="tcPlayer" :options="options" @load="onLoad" @play="onPlay" elmId="globalTcPlayer" />
  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import hls from "videojs-contrib-hls"
import { VTcPlayer } from "v-tcplayer"
export default {
  name: "视频插件",
  data() {
    return {
      // video-player视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // techOrder: ['html5', 'flash'],// 兼容顺序
        html5: { hls: { withCredentials: false } },
        sources: [// 流配置，数组形式，会根据兼容顺序自动切换// type: 'rtmp/hls',
          {
            type: 'application/x-mpegURL',
            src: 'http://live.flyh5.cn/live/song.m3u8'
          },
          // {
          //   type: "video/mp4",
          //   src: "http://img.vrupup.com/web/szq/images/video_01.mp4",
          // }
        ],
        poster: "http://game.vrupup.com/resources/web/szq/images/img_03.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      //VTcPlayer 配置项
      options: {
        m3u8: "http://img.vrupup.com/web/szq/images/video_01.mp4", //动态渲染数据时候<VTcPlayer v-if="isshow" ref="tcPlayer" :options="options" @load="onLoad" @play="onPlay" />
        hlsUrl: "https://lib.baomitu.com/hls.js/0.8.9/hls.min.js", // 0.0.5增加
        width: "100vw",
        height: "400px",
        autoplay: false, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的  自动播放
        continuePlay: true, //是否连续播放
        coverpic: {
          style: "stretch",
          src: "http://game.vrupup.com/resources/web/szq/images/img_03.jpg",
        },
        listener:msg => {//监听
          if (msg.type == "ended") {
            console.log("播放完了")
          }
        }
      },
      isshow: false, //加载完成数据后，再绑定为true
    };
  },
  created() {},
  methods: {
    //监听加载完成
    onLoad() {
      console.log("加载完成");
    },
    //监听开始播放
    onPlay() {
      console.log("监听播放了");
    },
    //播放
    play() {
      this.player.play();
    },
    //暂停
    pause() {
      this.player.pause();
    },
    //获取当前播放时间
    getCurrentTime() {
      this.player.currentTime();
    },
    //播放新的地址
    loadNewVideo(url) {
      this.player.load(url);
    }
  },
  computed: {
    // tcPlayer实例
    player() {
      return this.$refs.tcPlayer.vTcPlayer;
    },
  },
  components: {
    VTcPlayer,
    videoPlayer,
    hls
  }
}
</script>
<style scoped>

</style>