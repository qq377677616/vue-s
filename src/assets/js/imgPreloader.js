// const imgPreloader = url => {
//   return new Promise((resolve, reject) => {
//     let image = new Image();
//     image.src = url;
//     image.onload = () => {
//       resolve();
//     };
//     image.onerror = () => {
//       reject();
//     };
//   });
// };
// export const imgsPreloader = imgs => {
//   let promiseArr = [];
//   imgs.forEach(element => {
//     promiseArr.push(imgPreloader(element));
//   });
//   return Promise.all(promiseArr);
// };
export default {
  mounted() {
    // setTimeout(() => {this.pageLoadingOk = true}, 60000)
    this.getFiles()
  },
  // 获取全部要预加载的文件
  methods: {
    getFiles() {
      const files = require.context('../images', true, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()
      // console.log("files", files)
      let count = 0
      for (let src of files) {
        let _src = require('../images/' + src.substring(2))
        let image = new Image()
        image.src = _src
        image.onload = () => {
          count++
          this.percentNum = Math.floor(count / files.length * 100)
          if (this.percentNum == 100) this.pageLoadingOk = true
        }
      }
      // for (let item of files) {
      //   console.log("item", item)
      //   let file = this.$imgSrc(item.substring(2))
      //   // base64的不加载
      //   if (file.indexOf('data:') !== 0) {
      //     this.files.push(file)
      //   }
      // }
    }
    // 图片预加载
    // const preload = imgs => {
    //   let count = 0
    //   for (let img of imgs) {
    //     let image = new Image()
    //     image.src = img
    //     image.onload = () => {
    //       count++
    //       // 计算图片加载的百分数，绑定到percent变量
    //       let percentNum = Math.floor(count / imgs.length * 100)
    //       console.log("percentNum", percentNum)
    //       // this.percent = `${percentNum}%`
    //     }
    //   }
    // } 
  }
}