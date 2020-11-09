module.exports = {
  presets: [
    ['@vue/app', {
      'targets': {
        'browsers': ['last 2 versions', 'ie >= 9', '> 5%']
      },
      'loose': true,
      'debug': false,
      useBuiltIns: 'entry',
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]

  ]
  // presets: [
  //   ["env", {
  //     "modules": false,
  //     "targets": {
  //       "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
  //     }
  //   }],
  //   "stage-2"
  // ],
  // "plugins":["transform-vue-jsx", "transform-runtime"]
}
