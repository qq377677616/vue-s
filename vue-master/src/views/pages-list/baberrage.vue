<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="con">
      <!-- 视频区域 -->
      <div :class="{'fixed': isFocus}">
        <div class="video-box">
          <!-- 视频部分 -->
          <div class="live"><iframe src="https://live.hst.com/room/vhK8QFaW7?embed=video" frameborder="0"></iframe></div>
          <!-- 弹幕部分 -->
          <div class="barrages-drop">
            <vue-baberrage
              :isShow="barrageIsShow"
              :barrageList="barrageList"
              :maxWordCount="maxWordCount"
              :throttleGap="throttleGap"
              :loop="barrageLoop"
              :boxHeight="boxHeight"
              :messageHeight="messageHeight"
              :lanesCount="lanesCount"
            ></vue-baberrage>
          </div>
        </div>
        <!-- 导航栏 -->
        <div class="tab flex-cen" v-if="!isFocus">
          <div class="item" :class="{'on': tabIndex == 0}" @click="mySwitchs(1)">聊天室</div>
          <div class="item" :class="{'on': tabIndex == 1}" @click="mySwitchs(2)">节目单</div>
          <div class="item" :class="{'on': tabIndex == 2}" @click="mySwitchs(3)">个人中心</div>
        </div>
      </div>
      <!-- <button class="send" @click="switchs">{{barrageIsShow ? '关闭弹幕' : '打开弹幕'}}</button> -->
      <!-- 聊天室、节目单、个人中心 -->
      <div class="content flex1" ref="content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <!-- 聊天室 -->
            <div class="swiper-slide chat-room" ref="songzi" id="scroll" :style="{height: (contentHeight - inputMsgHeight) + 'px'}">
              <!-- <scroll class="ul" ref="scroll">  -->
                <div class="chat" :class="{'on': isFocus}" ref="chat">
                  <ul ref="ul">
                    <li class="flex-ali" v-for="item in messageList" :key="'消息'+ item.id">
                      <div class="avatar">
                        <img :src="item.avatar" alt="">
                      </div>
                      <p>{{item.msg}}</p>
                    </li>
                  </ul>
                </div>
              <!-- </scroll> -->
            </div>
            <!-- 节目单 -->
            <div class="swiper-slide flex-cen" :style="{height: contentHeight + 'px'}">节目单</div>
            <!-- 个人中心 -->
            <div class="swiper-slide flex-cen" :style="{height: contentHeight + 'px'}">个人中心</div>
          </div>
        </div>
      </div>
      <!-- 输入框 -->
      <div class="input-box flex-ali" :class="{'on': isX}" ref="inputMsg">
        <input placeholder="输入您想说的" v-model="input_msg" type="text" @focus="inputMsgFocus" @blur="inputMsgBlur">
        <button @click="sendMsgs">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import { setPageScrollTop, isSystem } from "assets/js/util"
import Scroll from 'base/scroll/scroll.vue'
import MyHeader from "components/header.vue"
import Swiper from 'swiper'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage"
export default {
  name: "Barrages",
  data() {
    return {
      pageTitle: "直播聊天室",
      websockUrl: "ws://192.168.1.185:9501/",//websock地址
      websock: null,//websock
      setInterval_websock: null,//心跳定时器
      reconnect: [0, 5],//重连次数
      messageList: [],//聊天列表
      barrageIsShow: true,//是否显示弹幕
      messageHeight: 48,//每条弹幕高度
      lanesCount: 4,//弹道数量
      barrageLoop: false,//是否循环
      throttleGap: 1000,//弹幕之间的节流时间
      boxHeight: 150,//显示弹幕区域的高度?
      maxWordCount: 10,//弹幕最大字数长度，超过则忽略（中文占2长度，英文占1长度）?
      barrageList: [],//弹幕数据列表
      barrageId: 1,//弹幕id
      tabIndex: 0,
      contentHeight: 300,//下方界面高度
      scrollHeight: 291,//滚动区域高度
      inputMsgHeight: 42,//聊天室输入框栏高度
      Swiper: null,
      input_msg: '',//聊天室输入框
      isFocus: false,//是否聚焦input
      isPhone: true,//是否是手机端
      isX: false,//是否是苹果X系列
    };
  },
  created() {
    this.initWebSocket()
    this.isSystems()
    this.isPhones()
  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  mounted() {
    // this.addToList();
    // setInterval(() => {
    //   this.send()
    // }, 1200)    
    this.swiperInit()
    this.$nextTick(() => {
      this.getContentHeight()
    })
  },
  computed: {

  },
  methods: {
    //判断是否是
    isSystems() {
      isSystem().then(res => {
        this.isX = res.isX.isX
      })
    },
    //判断是否是手机端
    isPhones() {
      this.isPhone = !window.location.href.includes("localhost")
    },
    //获取下方界面高度
    getContentHeight() {
      this.contentHeight = this.$refs.content.clientHeight
      this.inputMsgHeight = this.$refs.inputMsg.clientHeight
      this.scrollHeight = this.$refs.songzi.clientHeight
      setTimeout(() => {
        this.scrollHeight = document.getElementById("scroll").clientHeight
      }, 500)
    },
    //swiper初始化
    swiperInit() {
      this.Swiper = new Swiper ('.swiper-container', {
        loop: false,//是否循环
        pagination: '.swiper-pagination',//分页器
        nextButton: '.swiper-button-next',//按钮1
        prevButton: '.swiper-button-prev',//按钮2
        scrollbar: '.swiper-scrollbar',//滚动条
        // autoplay: {//自动播放
        //   delay: 3000,//时间 毫秒
        //   disableOnInteraction: false//用户操作之后是否停止自动轮播
        // },
        on: {
          slideChangeTransitionStart: () => {
            this.tabIndex = this.Swiper.activeIndex
          },
          sliderMove: function(e){
            console.log("e", e)
          },
          progress: function(progress){
            console.log(progress);
          }
        },
      })   
    },
    //聊天室输入框聚焦
    inputMsgFocus() {
      if (!this.isPhone) return
      this.isFocus = true
    },
    inputMsgBlur() {
      setTimeout(() => {
        setPageScrollTop(0)
      }, 200)
      this.isFocus = false
    },
    //点击导航切换
    mySwitchs(index) {
      this.tabIndex = index - 1
      this.Swiper.slideTo(index - 1)
    },
    sendMsgs() {
      if (!this.input_msg) {
        this.$toast("请先输入您想说的")
        return
      }
      let actions = { action: "msg", content: { content: this.input_msg } }
      this.websocketsend(JSON.stringify(actions))
      // this.input_msg = ''
      // setTimeout(() => {
      //   this.sendMsg()
      //   this.send()
      // }, this.random(700, 1000))
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data)
    },
    //接受数据处理
    messageHandle(e) {
      let _redata = JSON.parse(e.data)
      if (_redata.type == 'msg') {//聊天室消息
        this.handle_message(_redata)
      } else if (_redata.type == 'bullet') {//弹幕
        console.log("【弹幕】")
      } else if (_redata.type == 'fixed') {//整点抽奖
        console.log("【整点抽奖】")
      } else if (_redata.type == 'acc') {//累计抽奖
        console.log("【累计抽奖】")
      } else if (_redata.type == 'vote') {//投票
        console.log("【投票】")
      }
      
    },
    //收到到聊天室消息处理
    handle_message(_redata) {
      this.messageList.push({ id: this.barrageId++,avatar: this.randomWord().avatar, msg: _redata.msg })
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.chat.scrollTop = this.$refs.ul.clientHeight
          console.log("this.scrollHeight", this.$refs.ul.clientHeight, this.scrollHeight, this.$refs.ul.clientHeight - this.scrollHeight)
          this.$refs.ul.clientHeight - this.contentHeight > -30 && this.$refs.scroll.scrollTo(0, -(this.$refs.ul.clientHeight - (this.$refs.ul.clientHeight - this.scrollHeight)), 0, '')
        }, 500)
      })
    },
    //心跳
    websocketheartbeat() {
      clearInterval(this.setInterval_websock)
      this.setInterval_websock = setInterval(() => {
        //心跳代码
      }, 10000)
    },
    //关闭/打开弹幕
    switchs() {
      this.barrageIsShow = !this.barrageIsShow
    },
    //发送弹幕
    send() {
      let _item = {
        id: this.barrageId++,
        avatar: this.randomWord().avatar,
        msg: this.randomWord().msg,
        time: this.random(5, 10),
        barrageStyle: ""
      }
      this.barrageList.push(_item)
    },
    /**
     * weosocket相关事件方法
     */
    //weosocket初始化
    initWebSocket(){ 
      this.websock = new WebSocket(this.websockUrl)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
      this.websock.onmessage = this.websocketonmessage
    },
    //websocket连接成功回调
    websocketonopen(){
      console.log('%c【websocket连接成功】','color: red; background: yellow; font-size: 16px;')
      // this.sendMsg()
    },
    //websocket连接失败回调
    websocketonerror(err){
      console.log('%c【websocket连接失败】','color: red; background: yellow; font-size: 16px;')
      if (this.reconnect[0] < this.reconnect[1]) {
        this.reconnect = [++this.reconnect[0], this.reconnect[1]]
        console.log("【开始重连第" + this.reconnect[0] + "次重连】")
        this.initWebSocket()
      }
    },
    //websocket数据接收回调
    websocketonmessage(e){
      console.log("【数据接收】", e)
      this.messageHandle(e)
    },
    //websocket断开连接回调
    websocketclose(e){
      console.log('【websocket断开连接】')
    },
    /**
     * 其它方法
     */
    //随机生成一个数字
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    //随机生成汉字
    randomWord() {
      let _str = ''
      let _avatar = [
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg",
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865753&di=9b03eb54ed626de367f25783bd064985&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-5aa5e2b81d2eafba51e5876f9f2cc45a_hd.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865875&di=af7c5d9c6932037c7aa9a20e7fea357b&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F23%2F1533138181-SDBeZOopjM.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865875&di=7cb2a1ef789f5ab983f0deca993566df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190919%2Fb4f1d991e947462681f53b934a4f609d.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865874&di=6f6170baecb8540bbea0a14adab80103&imgtype=0&src=http%3A%2F%2Fp1.qhimgs4.com%2Ft01c6f4d883b770d170.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865873&di=231bc849ce9076f1a10cc1d2de340ea2&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F22%2F1533134111-avmkoOhxPB.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865873&di=65557b5f1e04b0d6ab6416bf7f06eb60&imgtype=0&src=http%3A%2F%2Fwww.flybridal.com%2Fhuangse%2FaHR0cDovL2hiaW1nLmIwLnVwYWl5dW4uY29tLzk3YWZiOGJkZjQxYTQyYmU3M2U3MzQxMWE0NjkxODc4MTM0NWY0Zjg0ZWIzLW9RVWlYd19mdzY1OA%3D%3D.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865873&di=739cbfe93707646f4b0832e7b5ccf54a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F25%2F20160525224901_jQZUF.thumb.700_0.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865872&di=235f2366261b8901ef3b7bb62bbf2076&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-6073302b220bbebb53dd0aff6a54cebf_hd.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865842&di=cb16b06713f820650c984236a4582f38&imgtype=0&src=http%3A%2F%2Fimg2-cloud.itouchtv.cn%2Ftvtouchtv%2Fimage%2F20181021%2F1540105686619287.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865841&di=54b9819ca4edc23db81d716a510dfd64&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181113%2F12%2F1542084664-OrdkoMqebJ.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589430865841&di=9e597c390e551268297ad69e22f1b4e2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201407%2F13%2F20140713031851_vuYdX.thumb.700_0.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589431408446&di=0982e40bba4c86e62e42dd0c76bba811&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180805%2F94e03018b5ee43939a6c0b3b60137e20.jpeg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1051483022,3240614481&fm=11&gp=0.jpg'
      ]
      let _barrage = ['太棒了！', '会议效果不错~', '如果我来能现场就好了~~', '今天是个值得庆祝的日子', '会议现场布置的效果很赞！', '666666', '奥利给！', '奥利给~奥利给~', '很赞！很赞！很赞！', '李总给力！！！', '镜头可以拉进点吗', '2020年6月1日', '鼓掌鼓掌鼓掌鼓掌鼓掌', '给胡总鼓掌', '888888888', '第一次参加线上直播会议，感觉很赞！', '我可以来现场吗', '小红花送上~', '小红花小红花小红花', '小红花双手奉上', '大红花~', '大家准备抽奖', '我中了一等奖！！！', '什么时候可以投票', '投票是匿名的吗', '看来我要做做笔记了', '会议几点开始', '北京的报到', '在哪可以看录播', '深圳的报到', '上海的报到', '广州的报到', '天津的报到', '杭州的报到', '湖南的报到', '江西的报到', '山东的报到']
      // while(_str.length < num){
      //   _str += eval('"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"')
      // }
      // return _str
      return { msg: _barrage[this.random(0, _barrage.length - 1)], avatar: _avatar[this.random(0, _avatar.length - 1)] }
    }
  },
  components: {
    MyHeader,
    Scroll,
    vueBaberrage
  }
}
</script>
<style scoped>
@import '../../assets/css/swiper.min.css';
.con{font-size: 0;display:flex;flex-direction: column;height: calc(100vh - .92rem);}
.video-box{position: relative;}
.fixed{position: fixed;width:100%;left: 0;bottom:84px;z-index: 999999;}
.video-box iframe{width:100vw;height:4.2rem;}
.barrages-drop{width: 120%;height:100%;position:absolute;left:-20%;top:0;}  
.barrages-drop .baberrage-stage {width: 100%; height: 100%; overflow:visible !important;}
.barrages-drop>>>.baberrage-item .baberrage-msg{max-width: 4rem;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: .28rem;}
.barrages-drop>>>.blue .normal{ border-radius: 100px; background: #0078B9; color: #fff; }
.barrages-drop>>>.green .normal{ border-radius: 100px; background: #0EBD72; color: #fff; }
.barrages-drop>>>.red .normal{ border-radius: 100px; background: #e68fba; color: #fff; }
.barrages-drop>>>.yellow .normal{ border-radius: 100px; background: #EEB415; color: #fff; }
.send{width:2.8rem;height: 1rem;line-height: 1rem;text-align: center;border-radius: .06rem;background: #0EBD72;font-size: .3rem;color:#fff;margin:1rem auto;display: block;}
.ul{height:100%;overflow: hidden;}
.tab .item{margin:.2rem .5rem .1rem;font-size: .32rem;border-bottom: .04rem solid transparent;padding-bottom: .1rem;}
.tab .item.on{border-color:#FFBF0F;}
.content{background: #eee;font-size: .28rem;}
.baberrage-item{}
.swiper-container,.chat-room .chat{width:100%;height:100%;}
.chat-room{padding:.4rem;box-sizing: border-box;}
.chat-room .chat{overflow-y: auto;-webkit-overflow-scrolling:touch;}
.chat-room .chat.on{opacity: 0;}
.chat-room li{margin:.2rem 0;line-height: 1.5;}
.chat-room li .avatar{width:.6rem;height: .6rem;overflow: hidden;margin-right: .15rem;flex-shrink: 0;flex-grow: 0;}
.chat-room li .avatar img{width:100%;height:100%;border-radius: 50%;object-fit: cover;}
.input-box{padding:.1rem .2rem;background: #fff;position: fixed;width:100%;left:0;bottom:0;box-sizing: border-box;z-index: 1000;max-width: 750px;}
.input-box.on{padding-bottom: .4rem;}
.input-box input{flex:1;height:.6rem;font-size: .28rem;border:1px solid #ddd;padding-left: .1rem;border-radius: .1rem;}
.input-box button{width:1rem;height: .6rem;background: #17BE74;color:#fff;text-align: center;border-radius: .1rem;margin-left: .2rem;font-size: .3rem;}
/* .body{padding-bottom:calc(env(safe-area-inset-bottom) + 140rpx);} */
@media screen and (min-width: 640px) {
    .input-box{left:50%;transform: translateX(-50%);}
  }
</style>