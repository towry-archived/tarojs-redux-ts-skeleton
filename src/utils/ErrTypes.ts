import keymirror from 'keymirror';

export default keymirror({
  // 未知错误
  UNKNOWN: null,
  WX_API_FAIL: null,
  WX_API_SUPPORT_FAIL: null,
  WX_NOT_AUTH: null,
  // 网络错误
  NETWORK: null,
  API_CLIENT: null,
  API_SERVER: null,
  // token 失效.
  INVALID_AUTH_TOKEN: null,
  ACTION_CANCEL: null,
  NEED_UPGRADE_APP: null,
  UNAUTHED_WX_API: null,
})
