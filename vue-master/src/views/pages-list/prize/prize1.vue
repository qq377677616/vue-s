<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen-col">
        <div class="prizeBox">
          <div class="prize_box">
            <div class="ul">
              <div class="li" :class="{'cur': curIndex == index}" v-for="(item, index) in prizeList" :key="index" :style="{'transform': 'rotate('+ item.deg + 'deg)'}">
                <div class="box" :class="['type' + prizeList.length]">
                  <div class="title">{{item.name}}</div>
                  <image src="../img.png"></image>
                </div>
              </div>
            </div>
            <div class="needle" :style="{'transform': 'rotate('+ needleDeg + 'deg)', transition: 'all '+ duration / 1000 + 's ease-in-out'}"></div>
            <div class="start" :class="{'on': isPrize}" @click="start"><span v-if="isPrize">开始</span><span v-if="!isPrize">好运来...</span></div> 
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script type="span/ecmascript-6">
import MyHeader from 'components/header.vue'
import luckDraw from 'assets/js/luck-draw'
export default {
  name: "",
  data() {
    return {
      pageTitle: "圆盘抽奖(针转)",//页面标题
      //奖品池列表[这里是示例，开发时由接口返回]
      prizeList: [
        { id: 1, name: "5元话费券" },
        { id: 2, name: "iphone X" },
        { id: 3, name: "50元现金红包" },
        { id: 4, name: "谢谢参与" },
        { id: 5, name: "100元代金券" },
        { id: 6, name: "50积分" },
        { id: 7, name: "1000理财金" },
        { id: 8, name: "2积分" }
      ],
      isPrize: true,//当前是否在抽奖中
      needleDeg: -90//当前抽奖旋转角度
    }
  },
  created() {
    this.prizeInit()
  },
  methods: {
    //转盘初始化
    prizeInit() {
      this.luckDraw = new luckDraw(this, {
        type: 1,//抽奖类型，1：转盘针转、2：转盘盘转、3为九宫格，默认为1[非必填]
        prizeList: this.prizeList,//奖品池列表[必填项]
        duration: 4000,//转动时间，默认为5000[非必填项]
        id: "id"//奖品池列表、抽奖的奖品id字段，默认为'id'[非必填项]
      })
      this.luckDraw.init()
    },
    //点击开始抽奖
    start() {
      if (!this.isPrize) return
      let randomNum = Math.floor(Math.random() * this.prizeList.length)//这里模拟抽奖：随机从奖品池中一个奖品[开发中请求接口获取中奖id]
      let prizeId = this.prizeList[randomNum].id
      console.log(`中【${this.prizeList[randomNum].name}】`)
      this.luckDraw.start(prizeId).then(res => {
        if (res.status == 1) {
          this.$dialog.alert({ title: '中奖结果', message: this.prizeList[randomNum].name})
        } else if (res.status == 0){
          this.$dialog.alert("您手速太快了~")
        } else if (res.status == -1){
          this.$dialog.alert({ title: '抽奖异常', message: '抽奖异常,请检查抽奖传入的id字段和奖品池id字段是否匹配'})
        }
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
.prize_box{width:6rem;height: 6rem;border-radius: 50%;border: .08rem solid #274C28;position: relative;}
.prize_box .ul{width:100%;height: 100%;transform-origin: center center;border-radius: 50%;}
.prize_box .ul .li{width:3rem;border-top:1px solid #666;position: absolute;left:50%;top:50%;transform-origin: left top;text-align: center;}
.prize_box .ul .li text{display: block;margin-top: .36rem;transform: rotate(45deg);}
.prize_box .needle{width:2.2rem;height:.1rem;background: #00B26A;position: absolute;left:50%;top:calc(50% - .05rem);transform-origin: left center;transform: rotate(-90deg);}
.prize_box .needle::after{content:"";display: block;width:0;height:0;border: .2rem solid transparent;border-top-color:#00B26A;position: absolute;left:100%;top:calc(50% - .2rem);transform: rotate(-90deg);}
.prize_box .needle::before{content:"";display: block;width:.2rem;height:.2rem;border-radius: 50%;background: #00B26A;position: absolute;left:-.1rem;top:calc(50% - .1rem);}
.start{width:2rem;height: .8rem;line-height: .8rem;text-align: center;background: #00B26A;color:#fff;border-radius: .1rem;margin: .5rem  auto 0;}
.start.on{background: #B92722;border-color:#B92722;}
.prize_box .ul .li .title{font-size: .28rem;}
.prize_box .ul .li image{width: 1rem;height: .64rem;margin-top: .12rem;}
.prize_box .ul .li .box{text-align: center;}
/* 3个奖品时的样式 */
.prize_box .type3{transform: translate(-.6rem, 1.4rem) rotate(150deg);}
/* 4个奖品时的样式 */
.prize_box .type4{transform: translate(-.1rem, 1.2rem) rotate(135deg);}
/* 5个奖品时的样式 */
.prize_box .type5{transform: translate(.2rem, 1.1rem) rotate(125deg);}
/* 6个奖品时的样式 */
.prize_box .type6{transform: translate(.2rem, .8rem) rotate(120deg);}
/* 7个奖品时的样式 */
.prize_box .type7{transform: translate(.5rem, .8rem) rotate(115deg);}
/* 8个奖品时的样式 */
.prize_box .type8{transform: translate(.4rem, .6rem) rotate(110deg);}

</style>