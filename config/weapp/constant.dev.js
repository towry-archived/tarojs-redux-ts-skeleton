const getAddressInfo = require('../utils/getServerInfoFromEnv');

const addressInfo = getAddressInfo();

module.exports = {
  apiServer: {
    port: addressInfo.port || 3183,
    address: addressInfo.address || 'http://0.0.0.0'
  }
}
