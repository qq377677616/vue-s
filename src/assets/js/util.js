/*从地址栏获取传参*/
export function GetQueryString(name) {
  var after = window.location.hash.split("?")[1];
  if (after) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}
//数组洗牌打乱
export function shuffle(arr) {
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
export function setPageScrollTop(scrollTop) {
  window.pageYOffset = scrollTop
  document.body.scrollTop = scrollTop
  document.documentElement.scrollTop = scrollTop
}

//创建script标签并加载
export function loadScript(src, callback) {
  var s = document.createElement("script")
  s.async = false
  s.src = src
  var evtName = null
  var evtListener = null
  function logic() {
    s.parentNode.removeChild(s)
    s.removeEventListener(evtName, evtListener, false)
    callback && callback()
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
  s.addEventListener(evtName, evtListener, false)
  document.body.appendChild(s)
}
//保留n位小数
export function retainedDecimal(x, n, math) {
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
// js浮点数精度--两数相加
export function accAdd(num1, num2) {
  var r1, r2, m;
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
// js浮点数精度--两数相减
export function accSub(num1, num2) {
  var r1, r2, m;
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
export function accMul(num1, num2) {
  let m = 0, s1 = num1.toString(), s2 = num2.toString()
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//js浮点数精度--两数相除
export function accDiv(num1, num2) {
  var t1, t2, r1, r2;
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