import Taro from '@tarojs/taro';
import { ISemVer } from '../types/app';
import Exception from './Exception';
import ErrTypes from './ErrTypes';

let _version: ISemVer;

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
      major: parseInt(version[0] || 0, 10),
      minor: parseInt(version[1] || 0, 10),
      patch: parseInt(version[2] || 0, 10),
    };

  }

  let versionStruct = _version;

  if (
    versionStruct.major < 1 ||
    (versionStruct.major == 1 && versionStruct.minor < 1) ||
    (versionStruct.major == 1 && versionStruct.minor == 1 && versionStruct.patch < 1)
  ) {
    if (what === 'canIUse') {
      return false;
    }

    return true;
  }

  return Taro.canIUse(what);
}
