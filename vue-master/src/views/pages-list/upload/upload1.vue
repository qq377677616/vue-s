<template>
  <div class="body upload">
    <My-Header :title="pageTitle"></My-Header>
    <div id="box">
      <div id="upload">
        <div class="img-video">
          <ul>
            <li
              v-for="(item, index) in selectList"
              :key="'key' + index"
              :class="{'li-video': curType == 2}"
            >
              <img :src="getObjectURL(item.file)" alt v-if="curType == 1" />
              <video :src="getObjectURL(item.file)" v-if="curType == 2"></video>
              <span class="img-remove" @click="removeImg(index)">&times;</span>
            </li>
            <li
              class="add"
              data-type="0"
              @click="select"
              v-if="selectList.length > 0 && selectList.length < (curType == 1 ? maxImageZhang : maxVideoZhang)"
            >
              <span data-type="0">+</span>
            </li>
          </ul>
        </div>
        <div class="btn-box" v-if="selectList.length == 0">
          <div class="img-btn btn" data-type="1" @click="select"></div>
          <div class="video-btn btn" data-type="2" @click="select"></div>
        </div>
      </div>
      <input hidden type="file" multiple id="file" ref="file" />
      <!-- <input hidden type="file" multiple id="file2" ref="file" />
      <input hidden type="file" multiple id="file3" ref="file" /> -->
      <button class="submit" @click="submit">确认上传</button>
    </div>
    <show-modal :showModal="showModal"></show-modal>
  </div>
</template>

<script type="text/ecmascript-6">
import ShowModal from "base/showModal/showModal"
import MyHeader from "components/header.vue"
import { api } from "api/request.js"
export default {
  name: "",
  data() {
    return {
      pageTitle: "原生上传",
      upLoadUrl: 'http://game.flyh5.cn/game/walmartShare/public/index/index/upload_szq',//上传接口地址
      // upLoadUrl: "http://vrupup.com/shuihu/wx7c3ed56f7f792d84/ljy_ztjt/public/index.php/admin/upload/upload", //上传接口地址
      maxImageZhang: 9, //最大可以上传图片数量
      maxVideoZhang: 9, //最大可以上传视频数量
      FormData: new FormData(), //序列化键值对表单数据
      curType: "", //1为选择图片，2为选择视频
      selectList: [], //当前选择的图片/视频
      allSize: 0, //选择图片/视频的总大小
      showModal: {
        isShowModal: false,
        isIcon: true,
        title: "上传中"
      }
    };
  },
  created() {
    // this.myShowModal(``, true, true)
  },
  methods: {
    //选择图片/视频
    select(e) {
      let _this = this
      let file = this.$refs.file
      // let _input = document.getElementsByClassName("van-uploader__input")[0]
        // file.setAttribute("capture", "camcorder")
      e.target.dataset.type != 0 && (this.curType = e.target.dataset.type)
      this.curType == 1
        ? file.setAttribute("accept", "image/*")
        : file.setAttribute("accept", "video/*")
      file.click();
      file.addEventListener("change", function() {
        // if (!this.files) return
        console.log("this.files", this.files[0])
        console.log("this.files.name", this.files[0].name)
        let _allSelect = this.files
        let _max =
          _this.curType == 1 ? _this.maxImageZhang : _this.maxVideoZhang;
        let _num = Math.min(_allSelect.length, _max - _this.selectList.length)
        for (let i = 0; i < _num; i++) {
          _this.selectList.push({ file: _allSelect[i] })
        }
        file.value = ""
      });
    },
    //删除图片/视频
    removeImg(index) {
      this.selectList.splice(index, 1);
    },
    //点击上传
    submit() {
      if (this.selectList.length == 0) {
        this.myShowModal("请先选择文件");
        return;
      }
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < this.selectList.length; i++) {
        this.allSize += this.selectList[i].file.size / 1024 / 1024;
        this.FormData.append("files[]", this.selectList[i].file);
      }
      console.log("文件总大小：", `${this.allSize.toFixed(2)}M`)
      xhr.onreadystatechange = e => {
        //上传成功/失败回调
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log("【上传成功】");
            console.log(JSON.parse(xhr.responseText));
            this.myShowModal("上传成功");
            this.selectList = [];
            this.FormData = new FormData();
          } else {
            console.log("【上传失败】");
            console.log(xhr.responseText);
            this.myShowModal("上传失败");
            this.FormData = new FormData();
          }
        }
      };
      console.log("this.FormData = new FormData()", this.FormData[0]);
      xhr.upload.addEventListener(
        "progress",
        evt => {
          //监听上传进度
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            this.myShowModal(
              `上传中${parseInt(percentComplete * 100)}%`,
              true,
              true
            );
            console.log("【上传进度】", parseInt(percentComplete * 100) + "%");
          }
        },
        false
      );
      xhr.open("post", this.upLoadUrl, true);
      console.log("【this.FormDatathis.FormData】", this.FormData);
      xhr.send(this.FormData);
    },
    //获取本地预览图片
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    myShowModal(title, duration = 2000, icon = false) {
      if (typeof title == "boolean" && !title) {
        this.showModal.isShowModal = false;
        return;
      }
      this.showModal.isShowModal = true;
      this.showModal.title = title;
      this.showModal.isIcon = icon;
      if (typeof duration == "boolean" && duration) return;
      setTimeout(() => {
        this.showModal.isShowModal = false;
      }, duration);
    },
    //上传图片视频为base64
    uploadImg(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imgsrc = e.target.result;
        console.log("blob格式", this.getObjectURL(file));
        console.log("base64格式" + e.target.result);
      };
    }
  },
  components: {
    ShowModal,
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
#upload .btn-box .btn {
  width: 25px;
  height: 18px;
  background: url(../../../assets/images/icon_01.png) no-repeat;
  margin: 0 5px;
  -webkit-background-size: cover;
  background-size: cover;
  display: inline-block;
  vertical-align: top;
}
#upload .btn-box .video-btn {
  background-image: url(../../../assets/images/icon_02.png);
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
.img-video li {
  width: 30%;
  padding-bottom: 30%;
  position: relative;
  margin-bottom: 0.2rem;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
}
.img-video li:nth-child(3n - 1) {
  margin: 0 5%;
}
.img-video li:nth-child(6) ~ li {
  margin-bottom: 0;
}
.img-video li img,
.img-video li video {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
.img-remove {
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 50%;
  background: #f7333d;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 0.25rem;
  overflow: hidden;
  background-clip: padding-box;
}
.add {
  border: 1px dashed #e0e0e0;
  cursor: pointer;
}
.add span {
  position: absolute;
  display: block;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 0.6rem;
  color: #aaa;
}
</style>