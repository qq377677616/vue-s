<template>
  <div class="body cropper2">
    <My-Header :title="pageTitle"></My-Header>
    <div class="cropper-box full-screen flex-cen">
      <img :src="imgUrl" alt id="img" v-show="imgUrl" />
      <div class="input-box" v-show="!imgUrl">
        <i class="icon-jiahao iconfont"></i>
      </div>
      <input type="file" accept="image/png, image/jpg, image/jpeg" @change="change($event)" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { base64toFile } from 'assets/js/util'
import Exif from 'exif-js'
export default {
  name: "",
  data() {
    return {
      pageTitle: "图片裁剪2",
      imgUrl: ''
    }
  },
  methods : {
    change(event) {
      console.log("event", event)
      let _files = event.target.files[0]
      console.log("event.target.files", _files)
      Exif.getData( _files , () => {
        console.log("Exif.getTag", Exif.getTag)
        console.log("Exif.getTag( event.target.files[0], 'Orientation')", Exif.getTag( _files, 'Orientation'))
        this.Orientation = Exif.getTag( _files, 'Orientation');
        console.log(this.Orientation)
      });
      // let image = document.getElementById('img'); //预览对象
      this.clip(event , {
        // resultObj : image,
        aspectRatio : 1,//截取比例：1为正方形
        clipperInit: this.clipperInit,//裁剪初始化
        clipperInitOk: this.clipperInitOk,//裁剪初始化完成
        clipperStart: this.clipperStart,//开始裁剪
        clipperOk: this.clipperOk//裁剪完成
      })
    },
    //裁剪初始化
    clipperInit(){
      this.$toast.loading({ message: "初始化", loadingType: 'spinner', duration: 0 })
    },
    //裁剪初始化完成
    clipperInitOk() {
      this.$toast.clear()
    },
    //开始裁剪
    clipperStart() {
      this.$toast.loading({ message: "裁剪中", loadingType: 'spinner', duration: 0 })
    },
    //裁剪完成
    clipperOk(e) {
      this.$toast("裁剪完成")
      this.imgUrl = e.imgUrl
      console.log("base64toFile")
      console.log(base64toFile(e.imgUrl))
    },
  },
  destroyed() {
    if (document.getElementById("clip_container")) this.destoried()
  },
  components: {
    MyHeader
  }
}
</script>
<style>
@import "./cropper.css";
#clip_container.container {
  top: 0.92rem;
}
</style>
<style scoped>
.cropper-box {
  position: relative;
  background: #ddd;
}
.cropper-box img {
  width: 80%;
}
.input-box {
  width: 3.6rem;
  height: 3.6rem;
  line-height: 3.6rem;
  text-align: center;
  border: 1px solid #ddd;
  background: #fff;
}
.input-box i {
  font-size: 0.5rem;
}
.cropper-box input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  top: 0;
  margin-top: 0 !important;
}
</style>