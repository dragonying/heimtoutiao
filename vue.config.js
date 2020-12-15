const path = require('path')

module.exports = {
  lintOnSave: false, // 关闭 eslint
  publicPath: './', // 设置相对路径，让项目使用相对路径，为了让项目在任意地方都可以使用
  // 全局less处理
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/*.less')] // 加载less
    }
  }
  // 代理配置，只适用于开发环境
  // devServer: {
  //   proxy: {
  //     // 代理以/public开头的接口地址
  //     '/public': {
  //       target: 'http://127.0.0.1/heimamm', // 后台接口域名 http://127.0.0.1/heimamm/public
  //       secure: false, // 如果是https接口，需要配置这个参数
  //       changeOrigin: true, // 是否跨域
  //       pathRewrite: {}
  //     },
  //     '/fuck': {
  //       target: 'http://192.168.1.7:1337',
  //       secure: false, // 如果是https接口，需要配置这个参数
  //       changeOrigin: true, // 是否跨域
  //       pathRewrite: {
  //         '/fuck': '' // 重写，不需要做拼接
  //       }
  //     }
  //   }
  // }
}
