const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/szq/vue-s/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/resources/web/szq/vue-s/' : '/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@',resolve('src'))
      .set('components',resolve('src/components'))
      .set('views',resolve('src/views'))
      .set('assets',resolve('src/assets'))
      .set('utils',resolve('src/utils'))
      .set('base',resolve('src/base'))
      .set('api',resolve('src/api'))
  },
  devServer: {
    port: 5555,// 端口
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
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置
    //   config.plugins.push(
    //       new UglifyJsPlugin({
    //           uglifyOptions: {
    //               compress: {
    //                   drop_debugger: true,
    //                   drop_console: false,  //生产环境自动删除console
    //               },
    //               warnings: false,
    //           },
    //           sourceMap: false,
    //           parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
    //       })
    //   );
    // }
  },
  lintOnSave: false  
}