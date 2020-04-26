<template>
  <div class="body drag">
    <My-Header :title="pageTitle"></My-Header>
    <div class="box" ref="box" data-dom="box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from 'components/header.vue'
export default {
  name: "",
  data() {
    return {
      pageTitle: "自由拖拽",
      //拖拽相关
      inputs: [],
      isOpenDrop: true,//是否开启拖拽
      isTouch: false,//默认为没有触摸
      itemX: 0,//触摸点与拖拽体的间距x
      itemY: 0//触摸点与拖拽体的间距y
    }
  },
  methods: {
    //拖拽相关
    touchstart(event) {
      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
      if (!this.isOpenDrop) return
      let _touch
      if (event.touches[0]) {
        _touch = event.touches[0]
      } else {
        _touch = event
      }
      let { clientX, clientY } = _touch
      this.itemX = clientX - dom.offsetLeft
      this.itemY = clientY - dom.offsetTop
      this.isTouch = true
    },
    touchmove(event) {
      let dom = this.$refs[event.targetTouches[0].target.dataset.dom][0] ? this.$refs[event.targetTouches[0].target.dataset.dom][0] : this.$refs[event.targetTouches[0].target.dataset.dom]
      if (!this.isTouch) return
      let _touch
      if (event.touches[0]) {
        _touch = event.touches[0]
      } else {
        _touch = event
      }
      let { clientX, clientY } = _touch
      let [_headerH, _tabH] = [0, 0]
      if (document.getElementsByClassName('header')[0]) _headerH = document.getElementsByClassName('header')[0].clientHeight
      if (document.getElementsByClassName('tab')[0]) _tabH = document.getElementsByClassName('tab')[0].clientHeight
      let [_x, _y] = [clientX - this.itemX, clientY - this.itemY]
      let [p_W, p_H] = [window.innerWidth, window.innerHeight]
      let {
        clientWidth: _moveW,
        clientHeight: _moveH,
        style: styleObject
      } = dom
      if (_x > p_W - _moveW) _x = p_W - _moveW
      if (_x < 0) _x = 0
      if (_y > p_H - _moveH  - _tabH) _y = p_H - _moveH  - _tabH
      if (_y < _headerH) _y = _headerH
      styleObject.left = `${_x}px`
      styleObject.top = `${_y}px`
      styleObject.right = `auto`
      styleObject.bottom = `auto`
      event.preventDefault()
    },
    touchend() {
      this.isTouch = false
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .screenshot{position: relative;z-index: 10000;touch-action:none;}
  .box{width: 1.2rem;height: 1.2rem;border-radius: 50%;background: #C0633E;position: fixed;left:2rem;top:3rem;z-index: 10000;animation: breathing-lamp 1s infinite alternate;}
  .box.on{z-index: 99999;}
</style>