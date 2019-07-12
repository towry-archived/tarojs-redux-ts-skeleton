const constants = require('./weapp/constant.prod');

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    GLOBAL_VARS: constants,
    __DEV__: false,
  },
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
