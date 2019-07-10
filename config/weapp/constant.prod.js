const getAddressInfo = require('../utils/getServerInfoFromEnv');

const addressInfo = getAddressInfo();

module.exports = {
  apiServer: {
    port: addressInfo.port || '',
    address: addressInfo.address || 'https://xcx.moseeker.com',
  }
}
