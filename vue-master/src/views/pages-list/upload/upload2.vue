<template>
  <div class="body upload">
    <My-Header :title="pageTitle"></My-Header>
    <div id="box">
      <div id="upload">
        <div class="img-video">
          <ul>
            <li v-for="(item, index) in selectImg" :key="'key' + index">
              <img :src="item" alt="">
              <span class="img-remove" @click="removeImg(index)">&times;</span>
            </li>
            <li class="add" data-type="0" @click="chooseImage" v-if="selectImg.length > 0 && selectImg.length < maxImageZhang"><span data-type="0">+</span></li>
          </ul>
        </div>
        <div class="btn-box" v-if="selectImg.length == 0"><div class="img-btn btn" data-type="1" @click="chooseImage"></div></div>
      </div>
      <input hidden type="file" multiple id="file" ref="file" accept = "image/*" />
      <button class="submit" @click="submit">确认上传</button>  
    </div>
    <show-modal :showModal="showModal"></show-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import ShowModal from 'base/showModal/showModal'
import MyHeader from 'components/header.vue'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'
import { api } from 'api/request.js' 
import { base64Switch } from 'assets/js/util'
export default {
  name: "",
  data() {
    return {
      pageTitle: "微信jssdk上传",
      upLoadUrl: 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/upload/upload_file_base64_list',//上传接口地址
      maxImageZhang: 9,//最大可以上传图片数量
      selectList: [],//当前选择的图片/视频localID
      selectImg: [],//当前选择的图片/视频base64
      allSize: 0,//选择图片/视频的总大小
      localIdsCurindex: 0,//循环索引
      showModal: {
        isShowModal: false,
        isIcon: true,
        title: "上传中"
      }
    }
  },
  methods: {
    //选择图片
    chooseImage() {
      var _this = this
      console.log('wxwx', wx)
      wx.chooseImage({
        count: _this.maxImageZhang - _this.selectList.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          _this.selectList = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log(`【刚才选择了${_this.selectList.length}张照片】`)
          console.log(_this.selectList)
          _this.getLocalImgData()
        }
      })
    },
    //图片本地路径转base64
    getLocalImgData() {
      let _this = this
      wx.getLocalImgData({
        localId: _this.selectList[_this.localIdsCurindex], // 图片的localID
        success: function (res) {
          _this.localIdsCurindex++
          if (_this.localIdsCurindex <= _this.selectList.length) {
            if (res.errMsg == "getLocalImgData:ok") {
              console.log("【刚选择的图片】")
              console.log(base64Switch(res.localData).slice(0, 30))
              _this.selectImg.push(base64Switch(res.localData))
              _this.getLocalImgData()
              if (_this.localIdsCurindex == _this.selectList.length) {
                console.log("【多张图片获取base64路径ok】")
                console.log('共' + _this.selectImg.length + '张')
                console.log(_this.selectImg)
                _this.localIdsCurindex = 0
              }
            } else {
              console.log("err", res)
            }
          }  
        }
      })
    },
    //删除图片
    removeImg(index){
      this.selectImg.splice(index, 1)
    },
    //点击上传
    submit() {
      if (this.selectList.length == 0) {
        this.$toast("请先选择文件")
        return
      }
      console.log("传给后端的图片", this.selectImg)
      Toast.loading({ message: '图片上传中', forbidClick: true, duration: 0 })
      api(this.upLoadUrl, {  base64_arr: JSON.stringify(this.selectImg) }).then(res => {
        console.log("【上传返回】", res)
        if (res.status == 200) {
          setTimeout(() => {
            Toast.clear()
            this.$toast("作品上传成功")
            this.selectImg = []
          }, 800)
        }
      }).catch(err => {
        console.log("【上传返回err】", red)
      })
    }
  },
  components: {
    ShowModal,
    MyHeader
  }
}
</script>

<style scoped>
  .body{padding:8px;box-sizing: border-box;}
  #box{border:2px solid #982722;border-radius: 10px;width:100%;margin:0 auto;box-sizing: border-box;padding:10px;height:calc(100vh - 1.32rem);position: relative;margin-top: .92rem;}
  #upload{border: 1px solid #ccc;border-radius: 5px;padding: .2rem .3rem;height:6.3rem;position: relative;}
  #upload .btn-box{position: absolute;right:0;bottom:0;padding:.2rem;}
  #upload .btn-box .btn{width: 25px;height: 18px;background: url(../../../assets/images/icon_01.png) no-repeat;margin:0 5px;-webkit-background-size: cover;background-size: cover;display: inline-block;vertical-align: top;}
  #upload .btn-box .video-btn{background-image: url(../../../assets/images/icon_02.png);}
  .submit{width:calc(100% - 20px);height:40px;border-radius: 5px;background: #2D93FA;font-size: 18px;color:#fff;border:none;outline:none;margin-top: 20px;position: absolute;left:10px;bottom:10px;}
  .img-video li{width:30%;padding-bottom: 30%;position: relative;margin-bottom: .2rem;display: inline-block;vertical-align: top;box-sizing: border-box;}
  .img-video li:nth-child(3n - 1){margin:0 5%;}
  .img-video li:nth-child(6)~li{margin-bottom: 0;}
  .img-video li img,.img-video li video{position: absolute;width: 100%;height: 100%;left:0;top:0;object-fit: cover;}
  .img-remove{ position: absolute; right: -.2rem; top: -.2rem; display: block; width: .4rem; height: .4rem; line-height: .4rem; border-radius: 50%; background: #f7333d; color: #fff;text-align: center;text-decoration: none;font-size: 0.25rem;overflow: hidden;background-clip: padding-box;}
  .add{border: 1px dashed #E0E0E0;cursor: pointer;}
  .add span{position: absolute;display: block;width: 100%;top:50%;transform: translateY(-50%);text-align: center;font-size: .6rem;color:#aaa;}
</style>