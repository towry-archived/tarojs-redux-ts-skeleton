import Taro from '@tarojs/taro';

let _version:

// Since v1.1.1
export default function canIUse(what: string): boolean {

  if (!_version) {

    let sysInfo = Taro.getSystemInfoSync();
    let version = sysInfo.SDKVersion;

    if (typeof version === 'string') {
      version = version.split('.');
    } else {
      version = [];
    }

    _version = {
      main: parseInt(version[0] || 0, 10),
      minor: parseInt(version[1] || 0, 10),
      patch: parseInt(version[2] || 0, 10),
    };

  }

  let versionStruct = _version;

  if (
    versionStruct.main < 1 ||
    (versionStruct.main == 1 && versionStruct.minor < 1) ||
    (versionStruct.main == 1 && versionStruct.minor == 1 && versionStruct.patch < 1)
  ) {
    // can not use canIUse api.
    console.log("不支持使用canIUse", versionStruct);
    return false;
  }

  return wx.canIUse(what);
}
