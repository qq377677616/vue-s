import { api } from 'api/request.js' 
/*********************项目接口请求列表(接口地址, 传参, 请求类型[get, post, jsonp], 是否qs参数, 接口地址形式[0为全链接，1为半链接，2为代理链接])*********************/
/**
 下面为项目接口请求 
 * return api(url, data, type, true, 1 )四个参数说明：
 * 请求地址、传参、post/get、是否qs、0为全地址/1为线上请求地址/2为本地代理地址 
 */ 
//测试接口
const getPostTest = (data, url = '/index/index/bis_detail', type = 'post') => { return api(url, data, type, true, 1) }
//上传图片
const uploadImg = (data, url = '', type = 'post', config) => { return api(url, data, type, false, 0, config) }
//测试接口
const getTest = (data, url = 'http://game.vrupup.com/sanguo/wx38da89ddf8b76665/sye_lizhiyuan/public/api.php/index/getGoods', type = 'post') => { return api(url, data, type, true, 0) }

export {
  getPostTest,
  uploadImg,
  getTest
}