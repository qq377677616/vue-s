<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen-col">
        <div class="prizeBox">
          <div class="prize_box">
            <div class="box">
              <div class="ul" :style="{transform: 'rotate(' + needleDeg + 'deg)'}">
                <div class="li" v-for="(item, index) in prize" :key="'item' + index" :style="{transform:'rotate('+ -item.deg +'deg)'}"><span :style="{'transform':'rotate('+curNumDeg * .5+'deg)'}">{{item.name}}</span></div>
              </div> 
              <div class="needle"></div>
            </div>
            <!-- <div class="needle" :style="{transform: 'rotate(' + needleDeg + 'deg)'}"></div> -->
            <div class="start" :class="{'on': isPrize}" @click="start"><span v-if="isPrize">开始</span><span v-if="!isPrize">好运来...</span></div>
          </div>  
        </div>


        <!-- <view class="prizeBox">
          <view class="prize_box">
            <view class="ul" style='transform:rotate({{needleDeg}}deg)'>
              <view class="li {{curIndex == index ? 'cur' : ''}}" wx:for="{{prize}}" wx:key="{{item.id}}" style='transform:rotate({{-item.deg}}deg)'><text style='transform:rotate({{curNumDeg * .5}}deg)'>{{item.name}}</text></view>
            </view> 
            <view class="needle"></view>
          </view> 
          <view class="start {{isPrize ? '' : 'on'}}]" bindtap="start"><text wx:if="{{isPrize}}">开始</text><text wx:if="{{!isPrize}}">好运来...</text></view> 
        </view> -->

      </div>
    </div>
  </div>
</template>

<script type="span/ecmascript-6">
import MyHeader from 'components/header.vue'
export default {
  name: "",
  data() {
    return {
      pageTitle: "圆盘抽奖(针转)",
      prize: [
        { id: 1, name: "5元话费券" },
        { id: 2, name: "iphone X" },
        { id: 3, name: "50元现金红包" },
        { id: 4, name: "谢谢参与" },
        { id: 5, name: "100元代金券" },
        { id: 6, name: "50积分" },
        { id: 7, name: "1000理财金" },
        { id: 8, name: "2积分" },
      ],
      prize_cur: [
        { num: 3, name: "谢谢参与" },
        { num: 7, name: "2积分" },
        { num: 5, name: "50积分" },
        { num: 6, name: "1000理财金" },
        { num: 3, name: "谢谢参与" },
        { num: 7, name: "2积分" },
        { num: 5, name: "50积分" },
        { num: 2, name: "50元现金红包" },
        { num: 0, name: "5元话费券" },
        { num: 4, name: "100元代金券" },
        { num: 2, name: "50元现金红包" },
        { num: 7, name: "2积分" },
        { num: 1, name: "iphone X" },
        { num: 5, name: "50积分" },
        { num: 6, name: "1000理财金" },
        { num: 7, name: "2积分" }
      ],
      curNumDeg: 0,
      needleDeg: -90,
      isPrize: true,
      time: 6000
    }
  },
  created() {
    this.init()
  },
  methods: {
    //转盘初始化
    init() {
      let _prize = this.prize
      let _curNum = _prize.length
      let _curNumDeg = 360 / _curNum
      for (let i = 0; i < _curNum; i++) {
        _prize[i].deg = _curNumDeg * i
      }
      this.prize = _prize
      this.curNumDeg = _curNumDeg
    },
    //点击开始抽奖
    start() {
      if (this.isPrize) {
        let _num = Math.floor(Math.random() * this.prize_cur.length)
        let surplus = Math.floor(Math.random() * 7 + 2) / 10
        console.log(`【${this.prize_cur[_num].name}】`)
        let _needleDeg = (this.prize_cur[_num].num - surplus) * this.curNumDeg - 90 + this.needleDeg + (360 - this.needleDeg % 360) + 1800
        this.isPrize = false
        this.needleDeg = _needleDeg
        setTimeout(() => {
          this.$dialog.alert({ title: '中奖结果', message: this.prize_cur[_num].name})
          this.isPrize = true
        }, this.time + 300)
      }
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .prize_box .box{width:6.16rem;height: 6.16rem;position: relative;border-radius: 50%;border: .04rem solid #274C28;position: relative;}
  .prize_box .ul{width: 100%;height:100%;transition: all 6s ease-in-out;}
  .prize_box .ul .li{width:3.1rem;border-top:1px solid #666;position: absolute;left:50%;top:50%;transform-origin: left top;text-align: center;font-size: .28rem;}
  .prize_box .ul .li span{display: block;margin-top: .5rem;}
  .prize_box .needle{width:2.2rem;height:.1rem;background: #00B26A;position: absolute;left:50%;top:calc(50% - .05rem);transform-origin: left center;transform: rotate(-90deg);transition: all 5s ease-in-out;}
  .prize_box .needle::after{content:"";display: block;width:0;height:0;border: .2rem solid transparent;border-top-color:#00B26A;position: absolute;left:100%;top:calc(50% - .2rem);transform: rotate(-90deg);}
  .prize_box .needle::before{content:"";display: block;width:.2rem;height:.2rem;border-radius: 50%;background: #00B26A;position: absolute;left:-.1rem;top:calc(50% - .1rem);}
  .start{width:2rem;height: .8rem;line-height: .8rem;text-align: center;background: #00B26A;color:#fff;border-radius: .1rem;margin: .5rem  auto 0;}
  .start.on{background: #B92722;border-color:#B92722;}
</style>