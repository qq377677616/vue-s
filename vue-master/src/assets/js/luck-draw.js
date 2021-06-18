import { getRandomNum } from 'assets/js/util'
export default class luckDraw {
  constructor (page, option) {
    this.page = page
    this.option = option 
    this.type = this.option.type || 1
    this.duration = this.option.duration || 5000
    this.asyncTime = this.option.asyncTime == undefined ? 200 : this.option.asyncTime
    this.looTurnpNum = this.option.looTurnpNum || 8
  }
  //初始化
  init() {
    let { prizeList } = this.option
    let _curNumDeg = 360 / prizeList.length
    for (let i = 0; i < prizeList.length; i++) {
      prizeList[i].deg = _curNumDeg * i
    }
    this.page.prizeList = prizeList
    this.page.duration = this.duration
    this.page.curNumDeg = _curNumDeg
    this.page.needleDeg = this.type == 1 ? -90 : 0
    this.page.isPrize = true
    this.page.curIndex = this.page.curIndex
    if (this.type == 4) {
      this.page.prizeList = [...prizeList, ...prizeList]
      this.page.prizeBoxHeight = this.page.$refs.prizeBox[0].offsetHeight
      this.page.isluckDraw = 3
      this.page.trackNum = this.option.trackNum || 3
      // this.page.translateY = [0, 0, 0]
    }
  }
  //开始抽奖
  start(prizeId) {
    return new Promise(resolve => {
      if (!this.page.isPrize || this.page.isluckDraw == 0) {
        resolve({ status: 0 })
        return
      }
      if (this.type == 1 || this.type == 2) {//转盘抽奖
        let _num = this.page.prizeList.findIndex(item => item[this.option.id || 'id'] == prizeId)
        if (_num == -1) {
          resolve({ status: -1 })
          return
        }
        let surplus = Math.floor(Math.random() * 7 + 2) / 10, _needleDeg
        if (this.type == 1) {
          _needleDeg = (_num + surplus) * this.page.curNumDeg + this.page.needleDeg + (360 - this.page.needleDeg % 360) + 1800
        } else if (this.type == 2) {
          _needleDeg = (_num - surplus) * this.page.curNumDeg - 90 + this.page.needleDeg + (360 - this.page.needleDeg % 360) + 1800
        }
        this.page.isPrize = false
        this.page.needleDeg = _needleDeg
        setTimeout(() => {
          this.page.isPrize = true
          resolve({ status: 1 })
        }, this.duration + 300)
      } else if (this.type == 3) {//九宫格抽奖
        let _this = this
        if (!this.page.isPrize) {
          resolve({ status: 0 })
          return
        }
        var _curIndex = this.page.curIndex, start_num = this.option.start_num || 6, step = this.option.step || 5
        var _speed = this.option.speed || 260
        var _num = this.page.prizeList.findIndex(item => item[this.option.id || 'id'] == prizeId)
        var prize_num = _num + step * 8 - _curIndex - 1
        var _prize_num = 0
        var _auto = setTimeout(auto_prize, _speed)
        this.page.isPrize = false
        function auto_prize() {
          clearInterval(_auto)
          if (_prize_num <= prize_num) {
            _prize_num++
            _curIndex++
            _curIndex = (_curIndex) % 8
            if (_prize_num < start_num) {
              _speed -= 40
            } else if (_prize_num == start_num) {
              _speed = 25
            } else if (_prize_num >= start_num && _prize_num < start_num * 4) {
              _speed += 6
            } else {
              _speed += 16
            }
            _auto = setInterval(auto_prize, _speed)
            _this.page.curIndex = _curIndex
          } else {
            _this.page.isPrize = true
            resolve({ status: 1 })
          }
        }
      } else if (this.type == 4) {//老虎机抽奖
        this.page.isluckDraw = 0
        let prizeIndex = this.page.prizeList.findIndex(item => item.id == prizeId), isPrize = true
        if (prizeIndex == -1) {
          prizeIndex = getRandomNum(0, this.page.prizeList.length / 2 - 1)
          isPrize = false
        }
        let _loopNum1 = 0, _loopNum2 = 0, _loopNum3 = 0, _stopPosition = this.page.prizeBoxHeight * (this.page.prizeList.length / 2 + prizeIndex) * -1
        let { deviation, prizeStatus } = this.calcTrackStatus(prizeIndex, prizeId <= this.page.prizeList.length / 2)
        // console.log("prizeStatus", prizeStatus)
        // console.log("deviation", deviation)
        // console.log("prizeStatus", _stopPosition)

        setTimeout(() => {
          let _autoLoop0 = setInterval(() => {
            if ( -1 * this.page.translateY[0] > this.page.prizeBoxHeight * (this.page.prizeList.length - 1)) {
              _loopNum1++
              this.page.$set(this.page.translateY, 0, this.page.prizeBoxHeight * (this.page.prizeList.length / 2 - 1) * -1)
            } else if (_loopNum1 == this.looTurnpNum && this.page.translateY[0] == _stopPosition + deviation[0]) {
              clearInterval(_autoLoop0)
              this.page.isluckDraw++
              if (this.page.isluckDraw == this.page.trackNum) resolve({ status: !isPrize ? 2 : 1 })
            } else {
              this.page.$set(this.page.translateY, 0, this.page.translateY[0] - (_loopNum1 == this.looTurnpNum ? 0.5 : this.looTurnpNum - _loopNum1 + 1))
            }
          }, 1)
        }, this.asyncTime * 0)
        setTimeout(() => {
          let _autoLoop1 = setInterval(() => {
            if ( -1 * this.page.translateY[1] > this.page.prizeBoxHeight * (this.page.prizeList.length - 1)) {
              _loopNum2++
              this.page.$set(this.page.translateY, 1, this.page.prizeBoxHeight * (this.page.prizeList.length / 2 - 1) * -1)
            } else if (_loopNum2 == this.looTurnpNum && this.page.translateY[1] == _stopPosition + deviation[1]) {
              clearInterval(_autoLoop1)
              this.page.isluckDraw++
              if (this.page.isluckDraw == this.page.trackNum) resolve({ status: !isPrize ? 2 : 1 })
            } else {
              this.page.$set(this.page.translateY, 1, this.page.translateY[1] - (_loopNum2 == this.looTurnpNum ? 0.5 : this.looTurnpNum - _loopNum2 + 1))
            }
          }, 1)
        }, this.asyncTime * 1)
        setTimeout(() => {
          let _autoLoop2 = setInterval(() => {
            if ( -1 * this.page.translateY[2] > this.page.prizeBoxHeight * (this.page.prizeList.length - 1)) {
              _loopNum3++
              this.page.$set(this.page.translateY, 2, this.page.prizeBoxHeight * (this.page.prizeList.length / 2 - 1) * -1)
            } else if (_loopNum3 == this.looTurnpNum && this.page.translateY[2] == _stopPosition + deviation[2]) {
              clearInterval(_autoLoop2)
              this.page.isluckDraw++
              if (this.page.isluckDraw == this.page.trackNum) resolve({ status: !isPrize ? 2 : 1 })
            } else {
              this.page.$set(this.page.translateY, 2, this.page.translateY[2] - (_loopNum3 == this.looTurnpNum ? 0.5 : this.looTurnpNum - _loopNum3 + 1))
            }
          }, 1)
        }, this.asyncTime * 2)
      }
    })
  }
  //计算各个轨道的状态与对应的偏移量
  calcTrackStatus(prizeIndex, isPrize) {
    let _prizeStatusAll = []
    if (isPrize) {
      _prizeStatusAll = [1, 1, 1]
    } else {
      for (let i = 0; i < 3; i++) {
        if (i != 2) {
          _prizeStatusAll.push(getRandomNum(0, 1))
        } else {
          _prizeStatusAll[0] + _prizeStatusAll[1] == 2 ? _prizeStatusAll.push(0) : _prizeStatusAll.push(getRandomNum(0, 1))
        }
      }
    }
    return { prizeStatus: _prizeStatusAll, deviation: [this.getCalcDeviation(0, prizeIndex, _prizeStatusAll), this.getCalcDeviation(1, prizeIndex, _prizeStatusAll), this.getCalcDeviation(2, prizeIndex, _prizeStatusAll)] }
  }
  //计算随机偏移量
  getCalcDeviation(prizeIndex, _index, _prizeStatus) {
    let _deviation = 0, _random = getRandomNum(0, 1), _index_p = _index - 1, _index_n = _index + 1
    if (!_prizeStatus[prizeIndex]) {
      if (_random) {
        if (_index_n == this.page.prizeList.length / 2) {
          _deviation = getRandomNum(1, this.page.prizeList.length / 2 - 1) * this.page.prizeBoxHeight
        } else {
          _deviation = this.page.prizeBoxHeight * -1 
        }
      } else {
        if (_index_p == -1) {
          _deviation = getRandomNum(1, this.page.prizeList.length / 2 - 1) * this.page.prizeBoxHeight * -1
        } else {
          _deviation = this.page.prizeBoxHeight
        }
      }
    }
    return _deviation
  }
}