import Taro from '@tarojs/taro';
import canIUse from '../utils/canIUse';
import Exception from '../utils/Exception';
import ErrTypes from '../utils/ErrTypes';

/**
 * 获取用户信息，如果用户先前已经授权获取用户信息，则可以直接调用。
 * 否则返回错误信息.
 * 所以在使用此接口前，应该先查询用户是否授权使用getUserInfo接口，如果
 * 未授权，则需要通过button，open-type=getUserInfo的方式来先获取用户信息.
 * 具体看文档：https://developers.weixin.qq.com/miniprogram/dev/api/open.html#wxgetuserinfoobject
 */
export async function getUserInfo() {
  return new Promise((resolve, reject) => {
    getAuthScope().then((scope) => {
      if (scope['scope.userInfo']) {
        Taro.getUserInfo({
          success(res) {
            resolve(res);
          },
          fail() {
            // or not login.
            Taro.checkSession().then(() => {
              // not authorized by user
              reject(new Exception("Not authorized", ErrTypes.UNAUTHED_WX_API, {
                api: 'getUserInfo',
              }));
            }, () => {
              reject(new Exception("Invalid token", ErrTypes.INVALID_AUTH_TOKEN))
            })
          }
        })
      } else {
        // 侦测到了用户未授权.
        reject(new Exception("Not authorized", ErrTypes.UNAUTHED_WX_API));
      }
    }, (err) => {
      reject(err);
    })
  })
}


export function setBackgroundColor(options) {
  let support = canIUse('setBackgroundColor');
  if (!support) {
    return;
  }
  Taro.setBackgroundColor(options);
}

export function setNavigationBarColor(options) {
  let support = canIUse('setNavigationBarColor');
  if (!support) {
    return;
  }
  Taro.setNavigationBarColor(options);
}

export function getSetting() {
  let support = canIUse('getSetting');
  if (!support) {
    return Promise.reject(new Exception("Not supported", ErrTypes.NEED_UPGRADE_APP))
  }

  return new Promise((resolve, reject) => {
    Taro.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(new Exception(err.errMsg));
      }
    })
  })
}

/**
 * @return
 * {'scope.userInfo': true, 'scope.userLocation': false }
 */
export function getAuthScope(): Promise<any> {
  return getSetting().then((res: any) => {
    return res.authSetting || {};
  })
}

/**
 * 在以按钮形式获取用户信息中，通过此接口可以方便处理事件信息.
 * 确保在wepy框架下使用此方法.
 */
export function wxGetUserInfoHandle(eventData) {
  return new Promise((resolve, reject) => {
    if (!eventData || !eventData.detail || !eventData.detail.userInfo) {
      return reject(new Exception("Not authorized", ErrTypes.WX_NOT_AUTH));
    }
    return resolve(eventData.detail);
  })
}


export function wxGetUserInfoHandleSync(eventData) {
  if (!eventData || !eventData.detail || !eventData.detail.userInfo) {
    return null;
  }
  return eventData.detail;
}


export function reportMonitor(name: string, value: any) {
  if (!canIUse('reportMonitor')) {
    console.log('reportMonitor not supported');
    return;
  }

  if (typeof value !== 'number') {
    throw new TypeError("invalid argument");
  }

  Taro.reportMonitor(name, value);
}
