
// read from command line.
module.exports = function () {
  let API_URL = (process.env.API_URL || '');

  let apiUrlParts = API_URL.split(':');

  if (!API_URL) {
    return {};
  }

  if (apiUrlParts.length <= 2) {
    // x.x.x.x:xxxx
    return {
      port: apiUrlParts[1],
      address: apiUrlParts[0],
    }
  } else {
    // http://x.x.x.x:xxxx
    let port = apiUrlParts[apiUrlParts.length - 1];
    apiUrlParts.pop();

    return {
      port: port,
      address: apiUrlParts.join(':'),
    }
  }

}
