<template>
  <div class="body upload">
    <My-Header :title="pageTitle"></My-Header>
    <div id="box">
      <div id="upload">
        <div class="img-video">
          <div class="ul">
            <div class="li">
              <van-uploader ref="uploader" :accept="accept" v-model="fileList" multiple preview-size="80px" :max-count="maxImageZhang" :before-delete="beforeDelete"></van-uploader>
              <div class="click" v-if="isHuawei" @click="isActionsShow"></div>
            </div>
          </div>
        </div>
      </div>
      <button class="submit" @click="submit">确认上传</button>
      <van-action-sheet v-model="actionsShow" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from "components/header.vue"
import { uploadImg } from "api/api"
import { isSystem } from "assets/js/util"
export default {
  name: "",
  data() {
    return {
      pageTitle: "vant上传",
      upLoadUrl: 'http://game.flyh5.cn/game/walmartShare/public/index/index/upload_szq',//上传接口地址
      accept: "video/*",//上传文件类型[image/*、audio/*、video/*]
      maxImageZhang: 9, //最大可以上传图片数量
      maxVideoZhang: 9, //最大可以上传视频数量
      FormData: new FormData(), //序列化键值对表单数据
      curType: 1, //1为选择图片，2为选择视频
      allSize: 0, //选择图片/视频的总大小
      fileList: [],
      videosrc: '',
      actionsShow: false,//显示隐藏动作面板
      actions: [//动作面板选项
        { name: '相册', index: 0 },
        { name: '相机（摄像头）', index: 1 }
      ],
      isHuawei: false//是否为华为手机
    };
  },
  created() {
  },
  mounted() {
    this.isSystems()
  },
  methods: {
    //点击动作面板选项
    onSelect(item) {
      this.isActionsShow()
      let _input = document.getElementsByClassName("van-uploader__input")[0]
      if (item.index == 0) {
        _input.removeAttribute("capture")
      } else if (item.index == 1) {
        _input.setAttribute("capture", "camcorder")
      }
      console.log("this.$refs.uploader", this.$refs.uploader)
      this.$refs.uploader.chooseFile()
    },
    //显示隐藏动作面板
    isActionsShow(){
      this.actionsShow = !this.actionsShow
    },
    //触发vant上传组件
    clickInput() {
      console.log("this.$refs.uploader", this.$refs.uploader)
      this.$refs.uploader.chooseFile()
    },
    //:before-read
    // beforeRead(file){
    //   console.log("选择前file", file)
    // },
    //:before-delete
    // afterRead(file) {
    //   console.log("选择后file", file)
    // },
    //删除图片/视频
    beforeDelete(file) {
      console.log("删除后file", file)
      this.fileList.splice(this.fileList.findIndex(item => item == file), 1)
    },
    //点击上传
    submit() {
      if (this.fileList.length == 0) {
        this.$toast("请先选择文件")
        return;
      }
      this.$toast.loading({ message: "文件上传中", duration: 0, loadingType: "spinner" })
      console.log("待上传文件列表", this.fileList)
      for (let i = 0; i < this.fileList.length; i++) {
        this.allSize += this.fileList[i].file.size / 1024 / 1024
        this.FormData.append("files[]", this.fileList[i].file)
      }
      console.log("文件总大小：", `${this.allSize.toFixed(2)}M`)
      let config = {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total * 100 | 0)
        }
      } 
      uploadImg(this.FormData, this.upLoadUrl, 'post', config).then(res => {
        setTimeout(() => {
          this.$toast("上传成功")
          this.FormData = new FormData()
          this.allSize = 0
          this.fileList = []
          console.log("多图上传返回", res)
          this.videosrc = res.data.img[0]
        }, 800)
      })
    },
    //判断手机型号
    isSystems() {
      isSystem().then(res => {
        let _system = res.system.toLowerCase()
        if (_system.indexOf("al00a") != -1 || _system.indexOf("al00ta") != -1 || _system.indexOf("huawei") != -1) {
          console.log("【华为手机】")
          this.isHuawei = true
        } else {
          console.log("【不是华为手机】")
        }
      })
    }
  },
  components: {
    MyHeader
  }
};
</script>

<style scoped>
.body {
  padding: 8px;
  box-sizing: border-box;
}
#box {
  border: 2px solid #982722;
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 10px;
  height: calc(100vh - 1.32rem);
  position: relative;
  margin-top: 0.92rem;
}
#upload {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.2rem 0.3rem;
  height: 6.3rem;
  position: relative;
}
#upload .btn-box {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.2rem;
}
.submit {
  width: calc(100% - 20px);
  height: 40px;
  border-radius: 5px;
  background: #2d93fa;
  font-size: 18px;
  color: #fff;
  border: none;
  outline: none;
  margin-top: 20px;
  position: absolute;
  left: 10px;
  bottom: 10px;
}
#upload .li{display: inline-block;position: relative;}
#upload .li .click{width: 100%;height: 100%;position: absolute;left:0;top:0;z-index: 5;}
.img-video li div, .img-video li>>>.van-uploader__input-wrapper,.img-video li>>>input{width:100%;height: 100%;position: absolute;left:0;top:0;opacity: 1;}
.img-video li:nth-child(3n - 1),.img-video>>>.van-uploader__preview:nth-child(3n - 1) { margin: 0 7%; }
van-uploader{opacity: .1;}
</style>