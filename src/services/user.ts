import Taro from '@tarojs/taro';
import Exception from 'src/utils/Exception';
import ErrTypes from 'src/utils/ErrTypes';
import { login as loginApi } from '../api/user';

export async function login(): Promise<any> {
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
