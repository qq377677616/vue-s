//从地址栏获取传参
const getQueryString = name => {
  let after = window.location.hash.split("?")[1]
  if (after) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return null
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
const getDomPageDistance = dom => {
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
//判断当前浏览器环境
const getBrowserEnvironment = () => {
  return new Promise(resolve => {
    let u = navigator.userAgent.toLowerCase(), environment
    if (u.indexOf('windowsWechat') > -1) {
      environment = { status: 1, name: "PC端微信浏览器" }
    } else if (u.indexOf('windows') > -1) {
      environment = { status: 2, name: "PC端普通浏览器" }
    } else if (u.indexOf('iphone') > -1) {
      environment = { status: 3, name: "移动端苹果ios浏览器" }
    } else if (u.indexOf('android') > -1) {
      environment = { status: 4, name: "移动端安卓Android浏览器" }
    } else if (u.indexOf('ipad') > -1) {
      environment = { status: 5, name: "IPad端浏览器" }
    } else {
      environment = { status: 6, name: "其它浏览器" }
    }
    resolve(environment)
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
    }
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
//图片base64路径处理
const base64Switch = base64 => {
  return "data:image/jpg;base64," + base64.slice(base64.indexOf("/9j"))
}
//浏览器环境
const getIsWxClient = () => {
  return new Promise(resolve => {
    let ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true
    }
  })
}
//js浮点数精度--两数相加
const accAdd = (num1, num2) => {
  let r1, r2, m
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return Math.round(num1 * m + num2 * m) / m
}
//js浮点数精度--两数相减
const accSub = (num1, num2) => {
  let r1, r2, m, n
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n)
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
  let t1, t2, r1, r2
  try {
    t1 = num1.toString().split('.')[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = num2.toString().split(".")[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(num1.toString().replace(".", ""))
  r2 = Number(num2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
/*h5生成图片*/
const canvasImg = (options) => {
  return new Promise(reject => {
    var P_W = window.innerWidth
    var P_H = window.innerHeight
    var PSD_W = options.psd_w
    var PSD_H = options.psd_h
    var canvas = document.getElementById(options.canvasId)
    var ctx = canvas.getContext("2d")
    var devicePixelRatio = window.devicePixelRatio || 1
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1
    var ratio = devicePixelRatio / backingStoreRatio
    canvas.width = (options.psd_w * ratio) / 2
    canvas.height = (options.psd_h * ratio) / 2
    ctx.scale(ratio / 2, ratio / 2)
    if (options.bgImg) {
      options.imgList.unshift({
        url: options.bgImg,
        imgW: PSD_W,
        imgH: PSD_H,
        imgX: 0,
        imgY: 0
      })
    }
    var vars = {}
    for (var m in options.imgList) {
      vars["newImg" + m] = new Image()
      vars["newImg" + m].setAttribute("crossOrigin", "anonymous")
      vars["newImg" + m].src = options.imgList[m].url
    }
    var progress = 0
    for (var z in options.imgList) {
      vars["newImg" + z].onload = function() {
        progress += 2520 / options.imgList.length
        if (progress === 2520) {
          startDraw()
        }
      };
    }
    function addRoundRectFunc() {
      CanvasRenderingContext2D.prototype.roundRect = function(
        x,
        y,
        width,
        height,
        radius,
        fill,
        stroke
      ) {
        if (typeof stroke == "undefined") {
          stroke = false
        }
        if (typeof radius === "undefined") {
          radius = 5
        }
        this.beginPath();
        this.moveTo(x + radius, y)
        this.lineTo(x + width - radius, y)
        this.quadraticCurveTo(x + width, y, x + width, y + radius)
        this.lineTo(x + width, y + height - radius)
        this.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        );
        this.lineTo(x + radius, y + height)
        this.quadraticCurveTo(x, y + height, x, y + height - radius)
        this.lineTo(x, y + radius)
        this.quadraticCurveTo(x, y, x + radius, y)
        this.closePath()
        if (stroke) {
          this.stroke()
        }
        if (fill) {
          this.fill()
        }
      };
    }
    function startDraw() {
      //绘制图片
      for (var n in options.imgList) {
        if (!options.imgList[n].radius) {
          drawImg();
        } else if (options.imgList[n].radius == "50%") {
          ctx.save();
          var r = options.imgList[n].imgW * 0.5;
          ctx.arc(
            options.imgList[n].imgX + r,
            options.imgList[n].imgY + r,
            r,
            0,
            2 * Math.PI
          );
          ctx.clip();
          ctx.fill();
          drawImg(true);
          ctx.restore();
        } else {
          ctx.save();
          addRoundRectFunc();
          ctx.roundRect(
            options.imgList[n].imgX,
            options.imgList[n].imgY,
            options.imgList[n].imgW,
            options.imgList[n].imgH,
            options.imgList[n].radius,
            true
          );
          ctx.globalCompositeOperation = "source-in"
          ctx.clip();
          drawImg();
          ctx.restore();
        }
        function drawImg(arc) {
          ctx.drawImage(
            vars["newImg" + n],
            0,
            0,
            vars["newImg" + n].width,
            vars["newImg" + n].height,
            options.imgList[n].imgX,
            options.imgList[n].imgY,
            options.imgList[n].imgW,
            arc ? options.imgList[n].imgW : options.imgList[n].imgH
          );
        }
      }
      //绘制文字
      function drawFont() {
        var fonts = options.textList
        for (var k in fonts) {
          ctx.fillStyle = fonts[k].color
          ctx.font = fonts[k].style
          ctx.textBaseline = "hanging"
          ctx.textAlign = fonts[k].textAlign ? fonts[k].textAlign : "start";
          isSystem(function(res) {
            if (res.isiOS) {
              fonts[k].textY -= 10;
            }
          });
          if (fonts[k].vel) {
            for (var z in fonts[k].string) {
              ctx.fillText(
                fonts[k].string[z],
                fonts[k].textX,
                fonts[k].textY +
                  z * (parseInt(fonts[k].fontSize) + fonts[k].vel)
              )
            }
          } else {
            ctx.fillText(fonts[k].string, fonts[k].textX, fonts[k].textY)
          }
        }
      }
      function isSystem(callback) {
        var u = navigator.userAgent
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        callback({ isAndroid: isAndroid, isiOS: isiOS })
      }
      drawFont()
      reject(canvas.toDataURL("image/png"))
    }
  })
}
export {
  getQueryString,
  shuffle,
  setPageScrollTop,
  getScreenWidthHeight,
  getDomPageDistance,
  loadScript,
  getBrowserEnvironment,
  isSystem,
  audioContextMusic,
  retainedDecimal,
  base64Switch,
  getIsWxClient,
  accAdd,
  accSub,
  accMul,
  accDiv,
  canvasImg
}