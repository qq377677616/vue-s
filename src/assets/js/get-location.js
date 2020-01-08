import { loadScript } from 'assets/js/util'
import { api } from 'api/request.js'

//获取当前位置信息--腾讯
const getLocation_qq = () => {
  const getLocationQq = (data, url = 'https://apis.map.qq.com/ws/location/v1/ip?key=GW3BZ-NMN6J-JSEFT-FTC6R-F7DA3-Z3FVJ', type = 'jsonp') => { return api(url, data, type, true, 0) }
  return new Promise((resolve, reject) => {
    getLocationQq({ callbackName: "QQmap", output: "jsonp" }).then(res => {
      resolve(res)
    }).catch(err => { reject(err) })
  })
}
//获取当前位置信息--百度
const getLocation_baidu = type => {
  const AK = 'AqHbeO1DTPXX06zcMKTqhhOAHkyqnqxY'
  const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak=" + AK + "&s=1&callback=onBMapCallback"
  loadScript(BMap_URL)
  return new Promise((resolve, reject) => {
    if (typeof BMap !== "undefined") {
      getLocation()
    } else {
      window.onBMapCallback = getLocation
    }
    function getLocation() {
      if (type == '1') {
        let myCity = new BMap.LocalCity()
        myCity.get(result => { resolve(result) })
      } else {
        const locationCity = new BMap.Geolocation()
        locationCity.getCurrentPosition(
          options => { resolve(options) },
          err => { reject(err) },
          { provider: "baidu" }
        )
      }
    }
  })
}
//获取当前位置信息--高德（前端需要https域名） 
const getLocation_amap = () => {
  return new Promise((resolve, reject) => {
    loadScript("https://webapi.amap.com/maps?v=1.3&key=36b7d67054e5dcd7d391ab517478ccfe").then(res => {
      function initMap(id) {
        let mapObj = new AMap.Map(id, {})
        let geolocation;
        mapObj.plugin(['AMap.Geolocation'], function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
        })
        return geolocation;
      }
      let geolocation = initMap("map-container")
      AMap.event.addListener(geolocation, "complete", res => {
        resolve(res)
      })
    })
  })
}

export {
  getLocation_qq,
  getLocation_baidu,
  getLocation_amap
}