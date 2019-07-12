/**
 * 登录逻辑：
 *
 * 1. 通过微信小程序接口 login 获取 code，将 code 发送给后端.
 * 2. 后端拿到 code 通过微信接口进行用户信息验证，获取 openid, session_key 等
 *    保存到后端，并给前端返回一个自定义状态标识，比如一个 token.
 * 3. 前端拿到 token 存储到本地，每次业务请求带上这个 token 作为用户标识, 后端拿到这个token
 *    查询 openid, 查到就说明用户已登录.
 * 4. 如果没有 token 就视为未登录，重复步骤1进行登录。
 *
 * > 通过 wx.login 接口获得的用户登录态拥有一定的时效性。
 * > 用户越久未使用小程序，用户登录态越有可能失效。
 * > 反之如果用户一直在使用小程序，则用户登录态一直保持有效。
 *
 * 所以可以每次 onShow 的时候检查登录有效状态，使用 checkSession 来检查，如果过期则进行上面
 * 的登录逻辑。或者2天内检查一次 (官方说session_key有效期3天).
 *
 * 授权窗口是在调用某些微信接口时需要的，这些接口包括 wx.getUserInfo, wx.getLocation 等。
 * 可以通过 wx.getSetting 获取可调用的接口权限，然后发现自己想调用的接口没权限，就进入获取用
 * 户相关权限的流程。
 *
 * 大部分接口可以使用  wx.authorize 来提前获取用户权限，而 wx.getUserInfo 必须要通过按钮形式
 * 来获取。
 *
 * ```
 * // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
 * wx.getSetting({
 *  success(res) {
 *    if (!res.authSetting['scope.record']) {
 *      wx.authorize({
 *        scope: 'scope.record',
 *        success () {
 *          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
 *          wx.startRecord()
 *        }
 *      })
 *    }
 *  }
 * })
 *
 * - 获取用户信息 https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009
 */

import Taro from '@tarojs/taro';
import Exception from '../utils/Exception';
import ErrTypes from '../utils/ErrTypes';
import { login as loginApi } from '../api/user';
import log from '../utils/log';

let isLogining_ = false;
let loginQueue_: Array<{resolve: (o: any) => void, reject: (e: Error) => void}> = [];


async function tryLogin() {
  log('request login code');
  const { code } = await Taro.login();

  log('send login request to remote');
  const loginRes = await loginApi(code);

  if (!loginRes.ok() || !loginRes.has('authToken')) {
    throw new Exception("No auth token", ErrTypes.API_INVALID_AUTH_CODE);
  }

  const { user, authToken } = loginRes.data;

  return { user, authToken };
}

/**
 * Try login from local.
 * If failed, go to login page.
 */
export async function login(): Promise<any> {
  if (isLogining_) {
    return new Promise((resolve, reject) => {
      loginQueue_.push({
        resolve,
        reject,
      })
    })
  } else {
    isLogining_ = true;
    try {
      let { user, authToken } = await tryLogin();

      isLogining_ = false;
      loginQueue_.forEach(({ resolve }) => resolve({ user, authToken }));
      loginQueue_ = [];

      return { user, authToken };
    } catch (e) {
      isLogining_ = false;
      loginQueue_.forEach(({ reject }) => reject(e));
      loginQueue_ = [];
      throw e;
    }
  }
}
