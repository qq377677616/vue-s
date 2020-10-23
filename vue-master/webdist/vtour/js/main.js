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
//测试方法
function test(e) { postMessage({ eventName: getFunctionName(arguments.callee.toString()), data: e }) }
// function runScript() {
//   alert()
// }