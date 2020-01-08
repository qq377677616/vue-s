import { api } from 'api/request.js' 

//手机号归属地1----[来自聚合数据]
const getIpLocation_juhe = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test', type = 'post') => { return api(url, data, type, true, 0) }
//手机号归属地2----[来源极速数据]
const getIpLocation_jisu = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test2', type = 'post') => { return api(url, data, type, true, 0) }
//手机号归属地3----[来源百度数据]
const getIpLocation_baidu = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test3', type = 'post') => { return api(url, data, type, true, 0) }
//手机号归属地4----[来自api.k780数据]
const getIpLocation_k780 = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test4', type = 'post') => { return api(url, data, type, true, 0) }

export {
  getIpLocation_juhe,
  getIpLocation_jisu,
  getIpLocation_baidu,
  getIpLocation_k780
}