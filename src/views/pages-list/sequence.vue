<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen">
      <div class="currency" v-show="sequenceListIndex >= 0">
        <img :class="sequenceListIndex == index ? 'on' : ''" v-for="(item, index) in sequenceList" :key="index" :src="item.url" />
      </div>
      <van-button type="primary" class="start" @click="start" v-show="sequenceListIndex <= 0">播放序列帧</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { ASSETS_URL } from 'api/config'
export default {
  name: "",
  data() {
    return {
      pageTitle: "序列帧",
      sequenceListIndex: -1,
      sequenceList: { url: `${ASSETS_URL}sequence/bean/bean_`, num: 30, speed: 100, loop: false }
    }
  },
  created() {
    this.sequenceInit("sequenceList")//序列帧初始化
  },
  methods: {
    //点击开始
    start() {
      this.sequenceStart("sequenceList").then(() => { console.log("序列帧播放完成") })//序列动画开始
    },
    //序列帧初始化
    sequenceInit(sequence) {
      let _sequence = []
      let _url = this[sequence].url
      let _num = this[sequence].num
      for (let i = 0; i < _num; i++) {
        _sequence.push({ url: `${_url}${i + 1}.png`, num: this[sequence].num, speed: this[sequence].speed, loop: this[sequence].loop })
      }
      this[sequence] = _sequence
    },
    //序列动画开始
    sequenceStart(sequence) {
      let _num = 1
      return new Promise(resolve => {
        let autoSequence = setInterval(() => {
          let _curSequenceIndex = this[`${sequence}Index`] || 0
          _curSequenceIndex++
          if (_curSequenceIndex <= this[sequence][0].num) {
            this[`${sequence}Index`] = _curSequenceIndex
          } else {
            if ((typeof (this[sequence][0].loop) == 'boolean' && this[sequence][0].loop) || (typeof (this[sequence][0].loop) == 'number' && _num < this[sequence][0].loop)) {
              _num++
              this[`${sequence}Index`] = 0
            } else {
              this[`${sequence}Index`] = -1
              clearInterval(autoSequence)
              resolve()
            }
          }
        }, this[sequence][0].speed)
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .currency{position: fixed;width:100%;height:100%;z-index: 10;left:0;top:0;background: #eee;}
  .currency img{position: absolute;width:745rpx;height:921rpx;left:0;top:0;opacity: 0;}
  .currency img.on{opacity: 1;}
  .start{width:400rpx;height:100rpx;line-height: 100rpx;text-align: center;position: absolute;left:50%;top:50%;transform: translate(-50%, -50%);font-size: 30rpx;border:1rpx solid #222;border-radius: 10rpx;}
</style>