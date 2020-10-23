var krpano
function creatKrpano(fun) { krpano = fun }//初始化
//xml加载生命周期
function xmlcomplete(isLittleplanetintro) {
  krpano.set("skin_settings.littleplanetintro", true)
}
//设置自动旋转
function setAutoRotate(type = true) {
  krpano.set("autorotate.enabled", type)
}
//切换到指定缩放视角
function setFov(fov) {
  krpano.set("view.fov", fov)
}
//旋转到指定视角
function rotationAngle(deg, speed, direction) {
  let _direction = direction ? 'view.vlookat' : 'view.hlookat'
  console.log("_direction", _direction)
  if (!speed) { 
    krpano.set(_direction, deg)
    return
  }
  var hlookat = Number(krpano.get(_direction)).toFixed(0)
  var quyu = 0
  if (hlookat > 360) {
    quyu = Math.floor(hlookat / 360)
  }
  if (hlookat < -360) {
    quyu = Math.floor(hlookat / 360) 
  }
  hlookat = hlookat - 360 * quyu
  var t = setInterval(function() {
    if (hlookat == deg) {
      clearInterval(t)
    } else if (hlookat < deg) {
      hlookat++
      krpano.set(_direction, hlookat)
    } else if (hlookat > deg) {
      hlookat--
      krpano.set(_direction, hlookat)
    }
  }, speed)
}
//开启陀螺仪
function openGyro(type) {
  console.log("type ? false : true", type ? false : true)
  krpano.call( `set(plugin[skin_gyro].enabled,${type ? false : true});`)
  //关闭陀螺仪
  //krpano.call("set(plugin[skin_gyro].enabled,false);");
}
//切换场景
function loadscene(sceneName, blend) {
  krpano.call("loadscene('" + sceneName + "', null, MERGE, get(blendmodes[" + (blend || 'simple crossblending') + "].blend))");
}
/**
 * 添加一个热点
 * 
 * Spotname:热点标识名 
 * hlookat：横向坐标
 * vlookat：竖向坐标
 * _width：热点宽度
 * _height：热点高度
 * imgurl：热点资源路径
 * imgclick：点击事件 具体执行示例imgclick = 'imgclick(({"ispop":true,"data":11}))';
*/
function AddHotspot(spotname = "addhotspot", hlookat = 0.000, vlookat = 0.000, _width = 90, _height = 90, imgurl = "../vtour/img/img.jpg", text = "", imgclick = "false") {
  krpano.call("addhotspot(" + spotname + ");");
  krpano.call("set(hotspot[" + spotname + "].url," + imgurl + ");");
  krpano.call("set(hotspot[" + spotname + "].text," + text + ");");

  krpano.call("set(hotspot[" + spotname + "].ath," + hlookat + ");");
  krpano.call("set(hotspot[" + spotname + "].atv," + vlookat + ");");

  // krpano.call("set(hotspot[" + spotname + "].rx," + hlookat + ");");
  // krpano.call("set(hotspot[" + spotname + "].ry," + vlookat + ");");
  // krpano.call("set(hotspot[" + spotname + "].rz," + 100 + ");");

  // krpano.call("set(hotspot[" + spotname + "].ox," + hlookat + ");");
  // krpano.call("set(hotspot[" + spotname + "].oy," + vlookat + ");");

  krpano.call("set(hotspot[" + spotname + "].width," + _width + ");");
  krpano.call("set(hotspot[" + spotname + "].height," + _height + ");");
  krpano.call("set(hotspot[" + spotname + "].zoom," + false + ");");
  krpano.call("set(hotspot[" + spotname + "].scale," + 1 + ");");
  krpano.call("set(hotspot[" + spotname + "].distorted," + true + ");");
  krpano.call("set(hotspot[" + spotname + "].inverserotation," + false + ");");
  krpano.call("set(hotspot[" + spotname + "].scalechildren," + false + ");");
  krpano.call("set(hotspot[" + spotname + "].ondown,draghotspot(););");
  if (imgclick != "false") {
    // imgclick = 'imgclick(({"ispop":true,"data":11}))';
    krpano.call("set(hotspot[" + spotname + "].onclick," + imgclick + ");");
  }
}
/**
 * 设置热点属性
 * Spotname:热点标识名
 * Propertys：属性
 * Values：值
 * */
function ChangespotSet(Spotname, Propertys, Values) {
  krpano.call("set(hotspot[" + Spotname + "]." + Propertys + "," + Values + ");");
}
/**
 * 获取krpano点坐标 ath-x  atv-y
*/
function GetHotspot(Spotname) {
  let ath = krpano.get("hotspot[" + Spotname + "].ath");
  let atv = krpano.get("hotspot[" + Spotname + "].atv");
  let arr = [ath, atv];
  return arr;
}
/**屏幕坐标转全景坐标screentosphere*/
function MousePointTF(hlookat, vlookat) {
  // 全景坐标转屏幕坐标spheretoscreen
  vlookat -= 66;
  console.log("鼠标点击位置对应全景坐标位置:", hlookat, vlookat);
}
function AddAnyHotspot() {
  //跨浏览器的事件对象 
  var EventUtil = {
    addHandler: function (elem, type, handler) {
      if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
      } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, handler);
      } else {
        elem["on" + type] = handler;
      }
    },
    removeHandler: function (elem, type, handler) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
       } else if (elem.detachEvent) {
        elem.detachEvent("on" + type, handler);
       } else {
        elem["on" + type] = null;
       }
    },
    getEvent: function (event) {
      return event ? event : window.event;
    },
    getTarget: function (event) {
      return event.target || event.srcElement;
    },
    preventDefault: function (event) {
      if (event, preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    stopPropagation: function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  };
  //鼠标点击监听
  var div = document.getElementById("pano");
  console.log(div, EventUtil);
  EventUtil.addHandler(div, "click", function (event) {
    alert(event);
    event = EventUtil.getEvent(event);
    //JS中获取屏幕坐标方法的Y值比krpano中获取方法多66个像素点
    var sphereXY = krpano.screentosphere(event.screenX, event.screenY - 66);
    var sp = krpano.spheretoscreen(event.screenX, event.screenY - 66);
    var sphereX = sphereXY.x;
    var sphereY = sphereXY.y;
    console.log(sphereX, sphereY);
    krpano.call("addhotspot(kk);");
    krpano.call("set(hotspot[kk].url,../vtour/img/img.jpg);");
    krpano.call("set(hotspot[kk].ath," + sphereX + ");");
    krpano.call("set(hotspot[kk].atv," + sphereY + ");");
  });
}
//查找点
function LookupHotspot() {
  //手动输入热点text查找，此时可能出现多个热点
  var spottext = $("#inputHotspot").val();  //热点的text名字,可重复
  //在数据库中找到该名字所匹配的所有热点，并返回其信息，在图上显示
  //......
  //图上点击某点，信息框中出现对应的信息，此时点唯一
  //在数据库中找到该名字所匹配的热点后，再匹配坐标值找到对应点    函数传递三个变量，后两个可缺省
  
  //将全景图的视野转向第一个热点所在位置
  $("#ModyfiHotspot").attr("disabled", false);
  $("#DelHotspot").attr("disabled", false);
  krpano.set("view.hlookat", -180);
  krpano.set("view.vlookat", 50);
  //改变所找到点的图标
  krpano.call("set_hotspots/plugin(hotspot, url, ../SystemPicture/Mark2.png, name, " + spottext + ");");  //此处变量应为热点text和图片，热点text是用户输入的值
}
//修改热点
function ModyfiHotspot() {
  //点击表中所查找出的点，修改对应的信息
  var spotname = $("#inputHotspot").val();  //该点的name，唯一值
  //将视野转向该点并修改该点的图标
  krpano.set("view.hlookat", 0);
  krpano.set("view.vlookat", 30);
  //krpano.call("set_hotspots/plugin(hotspot, url, ../SystemPicture/Mark2.png, name, spot4);");
  //设置该点在图上可拖动，修改坐标
  krpano.call("set(hotspot[" + spotname + "].ondown,draghotspot(););");
  //......返回修改的内容
  //......修改成功后图上删掉该点
}
//删除点
function DeleteHotspot() {
  var spotname = $("#inputHotspot").val();
  //图上操作
  krpano.call("removehotspot(" + spotname + ");");//此处变量为热点name，唯一值，主键
  //数据库操作
}
/**
 * 其它方法
 */
//向父vue页面发送信息
function postMessage(e) {
  window.parent.postMessage(e, '*');
}
//获取方法名
function getFunctionName(tmp) {
  var re = /function\s*(\w*)/i;
  var matches = re.exec(tmp);
  return matches[1]
}