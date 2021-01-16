<template>
  <div class="b-scroll" ref="wrapper">
    <!-- <div><slot></slot></div> -->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 2
      },
      scrollbar: {
        type: Number,
        default: 0
      },
      isX: {
        type: Boolean,
        default: true
      },
      isY: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      pulldown: {
        type: Boolean,
        default: true
      },
      pullup: {
        type: Boolean,
        default: true
      },
      beforeScroll: {
        type: Boolean,
        default: true
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 50)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        //初始化配置
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,//1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流
          scrollX: this.isX,//横向滚动开关
          scrollY: this.isY,//竖向滚动开关
          click: this.click,//是否支持点击事件
          mouseWheel: true,//是否可鼠标控制
          bounce: true,//是否反弹,
          useTransition: true,//是否使用CSS3的Transition属性
          useTransform: true,//是否使用CSS3的Transform属性
          HWCompositing: true, //是否启用硬件加速          
          scrollbar: this.scrollbar ? { fade: this.scrollbar == 1 ? false : true, interactive: false } : false//滚动条
        })
        //滚动监听
        if (this.listenScroll) {
          this.scroll.on('scroll', pos => {
            this.$emit('scroll', pos)
          })
        }
        //下拉触顶
        if (this.pulldown) {
          this.scroll.on('touchEnd', pos => {
            if (this.scroll.y > 40) {
              this.$emit('pulldown', pos)
            }
          })
        }
        //上拉触底
        if (this.pullup) {
          this.scroll.on('scrollEnd', pos => {
            this.$emit('scrollEnd', pos)
            if (this.scroll.y <= (this.scroll.maxScrollY + 40)) {
              this.$emit('pullup', pos)
            }
          })
        }
        //开始触摸
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      //冻结禁用
      disable() {
        this.scroll && this.scroll.disable()
      },
      //解除冻结
      enable() {
        this.scroll && this.scroll.enable()
      },
      //重置
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //滚动到目标滚动值位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      //滚动到目标dom元素位置
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      //相对于当前位置偏移滚动
      scrollBy() {
        this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
      },
      //销毁
      destroy() {
        this.scroll.destroy()
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped>
  /* .b-scroll{overflow:hidden;} */
</style>
