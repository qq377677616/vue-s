//切换场景
function switchScene(e) { postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: e })  }
//监听旋转
function onviewchanged() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: hlookat = Number(krpano.get("view.hlookat")).toFixed(0) })
}
//监听加载
function onxmlcomplete() {
  // krpano.set("skin_settings.littleplanetintro", true)
  // postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: hlookat = Number(krpano.get("view.hlookat")).toFixed(0) })
}
//全景加载完成
function onloadcomplete() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景加载完成" } })
}
/**
 * 全景视频相关
 */
//全景视频可以播放了
function onvideoready() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景视频可以播放了" } })
}
//全景视频播放了
function onvideoplay() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景视频播放了" } })
}
//全景视频暂停了
function onvideopaused() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景视频暂停了" } })
}
//全景视频播放结束了
function onvideocomplete() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景视频播放结束" } })
}
//全景视频加载错误了
function onerror() {
  postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: { message: "全景视频加载错误" } })
}
//测试方法
function test(e) { postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: e }) }
// function runScript() {
//   alert()
// }