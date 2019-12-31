<template>
  <div class="prize body">
    <My-Header :title="pageTitle"></My-Header>
    <div id="container">
      <div class="full-screen flex-cen-col">
        <div class="prizeBox">
          <div class="prize_box">
            <div class="box">
              <div class="ul">
                <div class="li" :class="{ 'cur': curIndex == index }" v-for="(item, index) in prize" :key="'item' + index"><span>{{item.name}}</span></div>
              </div> 
              <div class="start" :class="{ 'on': isPrize }" @click="start"><span>{{isPrize ? '开始': '好运来...'}}</span></div>
            </div>
          </div>  
        </div>
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
      step: 8 * 5,
      curIndex: 1,
      speed: 260,
      start_num: 6,
      isPrize: true
    }
  },
  created() {

  },
  methods: {
    //点击抽奖
    start() {
      let _this = this
      if (this.isPrize) {
        var _curIndex = this.curIndex
        var _speed = this.speed
        //var prize_num = Math.floor(Math.random() * 8 + 40)
        var _num = Math.floor(Math.random() * this.prize_cur.length)
        console.log("【" + this.prize_cur[_num].name + "】")
        var prize_num = this.prize_cur[_num].num + this.step - _curIndex - 1
        var _prize_num = 0
        var _auto = setTimeout(auto_prize, _speed)
        this.isPrize = false
      }
      function auto_prize() {
        clearInterval(_auto)
        if (_prize_num <= prize_num) {
          _prize_num++
          _curIndex++
          _curIndex = (_curIndex) % 8
          if (_prize_num < _this.start_num) {
            _speed -= 40
          } else if (_prize_num == _this.start_num) {
            _speed = 25
          } else if (_prize_num >= _this.start_num && _prize_num < _this.start_num * 4) {
            _speed += 6
          } else {
            _speed += 16
          }
          _auto = setInterval(auto_prize, _speed)
          _this.curIndex = _curIndex
        } else {
          setTimeout(function () {
            _this.$dialog.alert({ title: '中奖结果', message: _this.prize_cur[_num].name})
            _this.isPrize = true
          }, 300)
        }
      }
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