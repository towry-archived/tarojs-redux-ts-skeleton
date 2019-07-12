import Taro from '@tarojs/taro';
import Exception from 'src/utils/Exception';
import ErrTypes from 'src/utils/ErrTypes';
import { login as loginApi } from '../api/user';

let isLogining_ = false;
let loginQueue_: Array<{resolve: (o: any) => void, reject: (e: Error) => void}> = [];


async function tryLogin() {
  const { code } = await Taro.login();
  if (!code) {
    throw new Exception("Invalid code", ErrTypes.API_INVALID_AUTH_CODE);
  }

  const loginRes = await loginApi(code);
  if (!loginRes.ok() || !loginRes.has('authToken')) {
    throw new Exception("No auth token", ErrTypes.API_INVALID_AUTH_CODE);
  }

  const user = loginRes.data;

  return user;
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
      let user = await tryLogin();
      loginQueue_.forEach(({ resolve }) => resolve(user));
    } catch (e) {
      loginQueue_.forEach(({ reject }) => reject(e));
    }
  }
}
