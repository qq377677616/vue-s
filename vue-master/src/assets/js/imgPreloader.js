const loadings = files => {
  return new Promise(resolve => {
    let count = 0
    let percentNum = 0
    for (let src of files) {
      // console.log("src", src)
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
  },
  //获取全部要预加载的文件
  methods: {
    getFiles() {
      loadings(require.context('../images', true, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()).then(() => {
        this.pageLoadingOk = true
      })
    }
  }
}
export {
  loadingPage
}