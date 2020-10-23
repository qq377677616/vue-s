<template>
  <div class="book">
    <!-- <div class="magazine-viewport">
      <div class="container">
        <div id="magazine"></div>
      </div>
    </div> -->
    <div class="magazine-viewport">
      <div class="container" :style="{ 'width': bookConfig.width, 'height': bookConfig.height }">
        <div class="magazine"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    bookConfig: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      isBookInitOk: false//是否初始化
    }
  },
  mounted() {
    this.turnInit()
  },
  methods: {
    //初始化
    turnInit() {
      // $('#canvas').fadeIn(1000);
      let _this = this, flipbook = $('.magazine')
      console.log('_this.bookConfig', _this.bookConfig)
      if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(this.turnInit(), 10)
        return
      } 
      // 创建flipbook
      flipbook.turn({     
        width: _this.bookConfig.width,
        height: _this.bookConfig.height,
        duration: _this.bookConfig.duration,//翻页速度，值越小越快
        acceleration: !isChrome(),//硬件加速
        gradients: true,//启用渐变      
        autoCenter: true,//自动居中此动画书
        elevation: _this.bookConfig.elevation,//翻页时从动画书边缘的高度
        pages: _this.bookConfig.pages,//总页数
        // Events
        when: {//事件
          end() { console.log("end") },
          first() { console.log("first") },
          last() { console.log("last") },
          start() { console.log("start") },
          zooming() { console.log("zooming") },
          turning: function(event, page, view){      
            var book = $(this),
            currentPage = book.turn('page'),
            pages = book.turn('pages')
            // 更新当前URI
            // Hash.go('page/' + page).update();
            // 显示和隐藏导航按钮
            // console.log("page", page)
            _this.$emit("prevNextCallBack", { pageIndex: page })
            disableControls(page);        
          },
          turned: function(event, page, view){
            // console.log("page2", event, page, view)
            if (page == 1 && !_this.isBookInitOk) {
              _this.isBookInitOk = true
              _this.$emit("bookInitOk", { pageIndex: page })
            }
            disableControls(page)
            $(this).turn('center')
            // if (page==1) { 
            //   $(this).turn('peel', 'br');
            // }
          },
          missing: function(event, pages){
            //添加杂志中没有的页面
            for (var i = 0; i < pages.length; i++){
              addPage(pages[i], $(this), _this.bookConfig.imgUrl)
            }
          }
        }
      })
    },
    //上翻、下翻
    pagePrevNext(type) {
      $('.magazine').turn(typeof type == 'object' ? 'next' : 'previous')
    }
  }
}
</script>

<style scoped>
  
</style>