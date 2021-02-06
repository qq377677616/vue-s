const loadings = files => {
  return new Promise(resolve => {
    let count = 0
    let percentNum = 0
    for (let src of files) {
      let _src = require('../images/' + src.substring(2))
      let image = new Image()
      image.src = _src
      image.onload = () => {
        count++
        percentNum = Math.floor(count / files.length * 100)
        if (percentNum == 100) resolve()
      }
    }
  })
}
const loadingPage =  {
  created() {
    this.getFiles()
    this.getCdnFiles()
  },
  //获取全部要预加载的文件
  methods: {
    //获取本地文件夹中的图片资源
    getFiles() {
      loadings(require.context('../images', true, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()).then(() => {
        this.pageLoadingOk = true
      })
    },
    //获取线上图片资源
    getCdnFiles() {
      //获取网络图片信息
      // const getNetWorkImg = img => {
        // let imgElems = document.getElementById(img)
        // let url = imgElems.src
        let varperformance = window.performance || window.msPerformance || window.webkitPerformance
        console.log("varperformance", varperformance)
        // let iTime = varperformance.getEntriesByName(url)[0]
        // let imgSize = iTime.decodedBodySize || iTime.encodedBodySize
        // return { bit: imgSize, Kilobyte: Number((imgSize/1024).toFixed(2)), MByte: Number((imgSize/1024/1024).toFixed(2)) }
      // } 
    }
  }
}
export {
  loadingPage
}