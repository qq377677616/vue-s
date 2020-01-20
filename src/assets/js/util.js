//从地址栏获取传参
const getQueryString = name => {
  let after = window.location.hash.split("?")[1];
  if (after) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}
//数组洗牌打乱
const shuffle = arr => {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  return _arr
}
//设置页面滚动高度
const setPageScrollTop = scrollTop => {
  window.pageYOffset = scrollTop
  document.body.scrollTop = scrollTop
  document.documentElement.scrollTop = scrollTop
}
//获取界面宽高
const getScreenWidthHeight = () => {
  return new Promise(resolve => {
    resolve({ width: document.body.clientWidth || document.documentElement.clientWidth, height: document.body.clientHeight || document.documentElement.clientHeight })
  })
}
//获取dom距离页面x、y方向的距离
const getDomPageDistance = (dom) => {
  return new Promise(resolve => {
    resolve({ left: dom.offsetLeft, top: dom.offsetTop })
  })
}
//创建script标签并加载
const loadScript = (src, callback) => {
  return new Promise((resolve, reject) => {
    let _script = document.createElement("script")
    _script.async = false
    _script.src = src
    let evtName = null
    let evtListener = null
    function logic() {
      _script.parentNode.removeChild(_script)
      _script.removeEventListener(evtName, evtListener, false)
      resolve()
    }
    evtName = "load"
    evtListener = logic
    // if (!-[1,]) {
    //   evtName = "readystatechange"
    //   evtListener = function () {
    //     (this.readyState == "loaded" || this.readyState == "complete") && logic()
    //   }
    // } else {
    //   evtName = "load"
    //   evtListener = logic
    // }
    _script.addEventListener(evtName, evtListener, false)
    document.body.appendChild(_script)

  })
}
//判断当前手机系统（Android/ios） 
const isSystem = callback => {
  return new Promise(resolve => {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    resolve({isAndroid: isAndroid, isiOS: isiOS})
  })
}
//audioContext播放音乐
const audioContextMusic = (mp3Url, clickEle, callback) => {
  let audioContext
  let audioBufferSourceNode
  let analyser
  let clickBtn = document.getElementById(clickEle)
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
  audioContext = new window.AudioContext()
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  loadAudioFile(mp3Url)
  function loadAudioFile(url) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function(e) {
      decodecFile(this.response)
    };
    xhr.send()
  }
  function decodecFile(fileContent) {
    audioContext.decodeAudioData(fileContent, function(buffer) {
      start(buffer)
    })
  }
  function start(buffer) {
    if(audioBufferSourceNode) { audioBufferSourceNode.stop() }
    audioBufferSourceNode = audioContext.createBufferSource()
    audioBufferSourceNode.connect(analyser)
    analyser.connect(audioContext.destination)
    audioBufferSourceNode.buffer = buffer
    audioBufferSourceNode.loop = true
    audioBufferSourceNode.start(0)
    callback({status: 1})
  }
  clickBtn.onclick=function(){
    if (audioContext.state === "suspended") {
      audioContext.resume()
      callback({status: 1})
    } else if (audioContext.state === "running") {
      audioContext.suspend()
      callback({status: 2})
    }
  }
}
//保留n位小数
const retainedDecimal = (x, n, math) => {
  n = n || 2
  math = math || 'round'
  let f_x = parseFloat(x)
  if (isNaN(f_x)) {
    return 0
  }
  let _n = '1'
  for (let i = 0; i < n; i++) {
    _n += '0'
  }
  _n = Number(_n)
  if (math == 'none') {
    f_x = parseInt(x * _n) / _n
  } else if (math == 'round') {
    f_x = Math.round(x * _n) / _n
  } else if (math == 'floor') {
    f_x = Math.floor(x * _n) / _n
  }
  let s_x = f_x.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + n) {
    s_x += '0'
  }
  return s_x
}
//js浮点数精度--两数相加
const accAdd = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // return (num1*m+num2*m)/m;
  return Math.round(num1 * m + num2 * m) / m;
}
//js浮点数精度--两数相减
const accSub = (num1, num2) => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
}
//js浮点数精度--两数相乘 
const accMul = (num1, num2) => {
  let m = 0, s1 = num1.toString(), s2 = num2.toString()
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//js浮点数精度--两数相除
const accDiv = (num1, num2) => {
  let t1, t2, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {
    t2 = 0;
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

export {
  getQueryString,
  shuffle,
  setPageScrollTop,
  getScreenWidthHeight,
  getDomPageDistance,
  loadScript,
  isSystem,
  audioContextMusic,
  retainedDecimal,
  accAdd,
  accSub,
  accMul,
  accDiv
}