<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen flex-cen-col">
      <img id="myimg" :src="myImg" alt="" @load="imgLoad">
      <!-- 显示区域 -->
      <div class="view-img flex-cen">
        <div class="img-box">
          <h3>压缩前</h3>
          <div class="img"><img v-show="compress_before.blob" :src="compress_before.blob" alt=""></div>
          <ul>
            <li>大小：<span v-show="compress_before.size">{{ compress_before.size.Kilobyte == 0 ? '/' : compress_before.size.Kilobyte > 1024 ? `${compress_before.size.MByte}M` : compress_before.size.bit > 1024 ? `${compress_before.size.Kilobyte}kb` : `${compress_before.size.bit }b`}}</span></li>
            <li>宽度：{{compress_before.size.width}}</li>
            <li>高度：{{compress_before.size.height}}</li>
          </ul>
        </div>
        <div class="img-box">
          <h3>压缩后</h3>
          <div class="img"><img v-show="compress_before.blob" :src="compress_after.blob" alt=""></div>
          <ul>
            <li>大小：<span v-show="compress_after.size">{{ compress_after.size.Kilobyte > 1024 ? `${compress_after.size.MByte}M` : compress_after.size.bit > 1024 ? `${compress_after.size.Kilobyte}kb` : `${compress_after.size.bit }b`}}</span></li>
            <li>宽度：{{compress_after.size.width}}</li>
            <li>高度：{{compress_after.size.height}}</li>
          </ul>
        </div>
      </div>
      <!-- 按钮区域 -->
      <div class="button-list flex-cen">
        <div>
          <van-button type="primary">file图片</van-button>
          <input class="poa" type="file" id="file" ref="file" accept="image/*" @change="inputChange($event)" />
        </div>
        <div><van-button type="primary" @click="compressBase64">base64图片</van-button></div>
        <div><van-button type="primary" @click="compressOnline">线上图片</van-button></div>
        <div><van-button type="primary" @click="compressLocal">本地图片</van-button></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import base64Img from './base64'
import { getNetWorkImg, getImageInfo, getBase64Size, compressImg, getFileData } from 'assets/js/util'
export default {
  name: "",
  data() {
    return {
      pageTitle: "图片压缩",//页面标题
      netWorkImg: "https://img.vrupup.com/web/szq/images/img_29.jpg",//网络图片
      localImg: require('assets/images/poster_03s.jpg'),//网络图片
      myImg: '',//原图片地址
      compress_before: { blob: '', size: '' },//压缩前
      compress_after: { blob: '', size: '' }//压缩后
    }
  },
  mounted() {
    // this.alert()
  },
  methods: {
    //file图片
    inputChange(e) {
      this.myImg = ''
      getFileData(e.target.files[0]).then(res => {
        this.compress_before = res
      })    
      compressImg(e.target.files[0], .2, .2).then(res => {
        this.compress_after = res
      })
    },
    //base64图片
    compressBase64() {
      this.myImg = ''
      getImageInfo(base64Img).then(res => {
        this.compress_before = {
          blob: base64Img,
          size: {
            width: res.width,
            height: res.height,
            ...getBase64Size(base64Img)
          }
        }
      })
      compressImg(base64Img, .1, .2).then(res => {
        this.compress_after = res
      })
    },
    //网络图片
    compressOnline() {
      this.myImg = this.netWorkImg
    },
    //本地图片(本地图片的原大小有时会丢失)
    compressLocal() {
      this.myImg = this.localImg
    },
    //图片加载完成
    imgLoad() {
      getImageInfo(this.myImg).then(res => {
        this.compress_before = {
          blob: this.myImg,
          size: {
            width: res.width,
            height: res.height, 
            ...getNetWorkImg("myimg")
          }
        }
      })
      compressImg(this.myImg, .2, .2).then(res => {
        this.compress_after = res
      })
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  .view-img{padding:0 5%;}
  .view-img h3{font-size: .4rem;text-align: center;margin-bottom:.5rem;font-weight: bold;}
  .view-img .img-box{margin:0 .2rem;}
  .view-img .img{width: 3rem;height: 4rem;background: #ccc;}
  .view-img img{width:100%;height:100%;object-fit: contain;}
  .view-img ul{margin-top: .5rem;}
  .view-img ul li{font-size: .3rem;margin:.2rem 0;}
  .button-list{width: 100%;margin-top: .4rem;}
  .button-list>div{position: relative;margin:0 .06rem;}
  .button-list input{opacity: 0;}
  .van-button--normal{height: .68rem;padding:0 .2rem;}
  #myimg{position: fixed;left:100%;top:0;}
</style>