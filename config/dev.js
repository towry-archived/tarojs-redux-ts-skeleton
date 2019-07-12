const constants = require('./weapp/constant.dev');

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    GLOBAL_VARS: constants,
    __DEV__: true,
  },
  weapp: {},
  h5: {}
}
