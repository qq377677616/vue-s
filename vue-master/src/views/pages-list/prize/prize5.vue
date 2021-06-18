<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen-col">
        <div class="box">
        <!-- 老虎机 -->
        <div class="tiger flex">
          <!-- 老虎机格子 -->
          <div class="box" v-for="num in 3" :key="num">
            <div class="item-list" :style="{ transform: 'translateY(' + translateY[num - 1] + 'px)' }">
              <div class="item" ref="prizeBox" v-for="(item, index) in prizeList" :key="index">
                <img :src="item.img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <!-- 启动按钮 -->
        <div class="btn flex-cen" :class="{'on': isluckDraw == 3}" @click="start">{{isluckDraw != 3 ? '抽奖中' : '点击抽奖'}}</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from 'components/header.vue'
import { getRandomNum } from 'assets/js/util'
import luckDraw from 'assets/js/luck-draw'
export default {
  data() {
    return {
      pageTitle: "老虎机抽奖",//页面标题
      translateY: [0, 0, 0], //当前某个盒子上下移动距离
      isluckDraw: 0,//抽奖是否完成,等于轨道数时完成
      prizeList: [
        { id: 1, name: '现金红包', img: "https://img.vrupup.com/wjh_project/lmjf_img/16184729506077eff6e4ba4.png" },
        { id: 2, name: 'R币', img: 'https://img.vrupup.com/wjh_project/lmjf_img/161855376860792ba8497cc.png' },
        { id: 3, name: '娃娃', img: "https://img.vrupup.com/web/szq/images/prize_01.jpg" },
        { id: 4, name: '黄金鼠', img: "https://img.vrupup.com/web/szq/images/prize_02.jpg" },
        { id: 5, name: '自行车', img: "https://img.vrupup.com/wjh_project/lmjf_img/16185415056078fbc167d2c.png" }
      ]
    }
  },
  mounted() {
    this.prizeInit()
  },
  methods: {
    //转盘初始化
    prizeInit() {
      this.luckDraw = new luckDraw(this, {
        type: 4,//抽奖类型，1：转盘针转、2：转盘盘转、3为九宫格、4为老虎机，默认为1[非必填]
        prizeList: this.prizeList,//奖品池列表[必填项]
        looTurnpNum: 8, //转动转动圈数，默认8圈
        asyncTime: 200//三个格子起动异步时间，默认为200
      })
      setTimeout(() => { this.luckDraw.init() }, 1000)
    },
    //点击开始抽奖
    start() {
      if (this.isluckDraw != this.trackNum) return
      //模拟一个中奖id
      let prizeId = getRandomNum(1, this.prizeList.length / 2 + 3), _prizeIndex
      _prizeIndex = this.prizeList.findIndex(item => item.id == prizeId)
      if (_prizeIndex != -1) {
        console.log("【中奖】", this.prizeList[_prizeIndex].name)
      } else {
        console.log("【未中奖】")
      }
      this.luckDraw.start(prizeId).then(res => {
        if (res.status == 1) {
          this.$dialog.alert({ title: '中奖结果', message: this.prizeList[_prizeIndex].name})
        } if (res.status == 2) {
          this.$dialog.alert({ title: '中奖结果', message: '未中奖'})
        } else if (res.status == 0) {
          this.$dialog.alert("您手速太快了~")
        }
      })
    }
  },
  components: {
    MyHeader
  }
};
</script>

<style scoped>
.body{background: #eee;}
.tiger .box {
  overflow: hidden;
  border: 1px solid green;
}
.tiger .box,
.tiger .box .item,
.tiger .box .item img {
  width: 1.5rem;
  height: 1.5rem;
}
.tiger .box .item {
  font-size: 0;
}
.tiger .box .item img {
  object-fit: cover;
}
.btn {
  width: 2rem;
  height: 0.8rem;
  background: #ccc;
  font-size: 0.32rem;
  color: #fff;
  margin: 1rem auto;
}
.btn.on{background: #0db85a;}
</style>