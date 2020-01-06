<template>
  <div class="audio">
    <audio :src="musicSrc" id="audio" loop></audio>
    <transition name="right-left">
      <div class="btns" v-show="isPlay > 0" @click="playPause('audio')">
        <img src="../../assets/images/music_01.png" alt="" class="btn-play" v-show="isPlay == 1">
        <img src="../../assets/images/music_02.png" alt=""  v-show="isPlay == 2">
      </div>
    </transition>
  </div>
</template>

<script>
import { getProjectConfig } from 'api/api'
export default {
  data() {
    return {
      // musicSrc: 'https://game.flyh5.cn/resources/game/wechat/szq/gaoxiao/music.mp3',
      musicSrc: '',
      isPlay: 0
    }
  },
  mounted() {
    this.shareConfig()
    // this.getMusicUrl()
  },
  created() {

  },
  methods: {
    //获取背景音乐地址
    getMusicUrl() {
      setTimeout(() => {
        let _musicUrl = sessionStorage.getItem("music")
        if (_musicUrl) {
          this.musicSrc = _musicUrl
          this.autoPlayAudio("audio")
        } else {
          this.setTimeout()
        }
      }, 500)
    },
    shareConfig() {
      getProjectConfig().then(res => {
        let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
        this.musicSrc = _data.res_music
        console.log("_data.res_music", _data.res_music)
        this.autoPlayAudio("audio")
      }).catch(err => {
        console.log(err)
        this.autoPlayAudio("audio")
      })
    },
    autoPlayAudio(audioId) {
      let _audio = document.getElementById(audioId)
      _audio.oncanplay = () => {
        _audio.play()
        this.isPlay = 1
        console.log("【背景音乐自动播放OK1】")
      }
      document.addEventListener("WeixinJSBridgeReady", () => {
        _audio.play();
        this.isPlay = 1
        console.log("【背景音乐自动播放OK2】")
      }, false);
    },
    playPause(audioId) {
      let _audio = document.getElementById(audioId)
      if (_audio.paused) {
        _audio.play()
        this.isPlay = 1
      } else { 
        _audio.pause() 
        this.isPlay = 2 
      }
    }
  }
}
</script>

<style scoped>
  .btns{position: fixed;right:0;top:0;padding: .3rem;z-index:999;transition: all .8s;}
  .btns img.btn-play{animation: rotate 2s linear infinite;}
  .btns img{box-shadow: 0 0 20px -2px #FFB8C4;border-radius: 50%;}
  .btns, .btns img{width:.5rem;height:.5rem;}
  .right-left-leave-active{right: -2rem;opacity: 0;}
  .right-left-enter{right: -2rem;opacity: 0;}
  @keyframes rotate{
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
</style>

