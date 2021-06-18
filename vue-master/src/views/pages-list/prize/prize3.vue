<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen-col">
        <div class="prizeBox">
          <div class="prize_box">
            <div class="ul">
              <div class="li" :class="{ 'cur': curIndex == index }" v-for="(item, index) in prizeList" :key="'item' + index"><span>{{item.name}}</span></div>
            </div>
            <div class="start" :class="{ 'on': isPrize }" @click="start"><span>{{isPrize ? '开始': '好运来...'}}</span></div>
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
      pageTitle: "圆盘抽奖(盘转)",//页面标题
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
      curIndex: 1//当前抽奖索引
    }
  },
  created() {
    this.prizeInit()
  },
  methods: {
    //转盘初始化
    prizeInit() {
      this.luckDraw = new luckDraw(this, {
        type: 3,//抽奖类型，1：转盘针转、2：转盘盘转、3为九宫格，默认为1[非必填]
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
        } else if (res.status == 0) {
          this.$dialog.alert("您手速太快了~")
        } else if (res.status == -1) {
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
  .prizeBox{width:90%;height:6.4rem;border:.04rem solid #274C28;border-radius: .2rem;padding:.2rem;}
  .prizeBox .prize_box{position: relative;}
  .prizeBox .ul .li,.start{width: 31%;height:2rem;line-height: 2rem;text-align: center;border-radius: .1rem;border:1px solid #ccc;box-sizing: border-box;font-size: .3rem;}
  .prizeBox .ul .li.cur{background: #00B26A;color:#fff;border-color:#00B26A;}
  .prizeBox .ul .li:nth-child(2){position: absolute;left:34.5%;top:0;}
  .prizeBox .ul .li:nth-child(3){position: absolute;left:69%;top:0;}
  .prizeBox .ul .li:nth-child(4){position: absolute;right:0;top:2.2rem;}
  .prizeBox .ul .li:nth-child(5){position: absolute;right:0;top:4.4rem;}
  .prizeBox .ul .li:nth-child(6){position: absolute;right:34.5%;top:4.4rem;}
  .prizeBox .ul .li:nth-child(7){position: absolute;right:69%;top:4.4rem;}
  .prizeBox .ul .li:nth-child(8){position: absolute;left:0;top:2.2rem;}
  .start{position: absolute;left:34.5%;top:2.2rem;background: #8481FF;color:#fff;border-color:#8481FF;}
  .start.on{background: #B92722;border-color:#B92722;}
</style>