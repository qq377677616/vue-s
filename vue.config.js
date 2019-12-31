const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/szq/vue-s/' : '/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@',resolve('src'))
      .set('components',resolve('src/components'))
      .set('assets',resolve('src/assets'))
      .set('utils',resolve('src/utils'))
      .set('base',resolve('src/base'))
      .set('api',resolve('src/api'))
  },
  devServer: {
    port: 7777,// 端口
    proxy: {
      '/api': {
        target: 'https://api.topsales.net.cn/open', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
      stylus: {
        // import: path.resolve(__dirname, './src/styles/global.styl')
      }
    }
  },
};