import Taro from '@tarojs/taro';

import {
  createReducer,
  createAction
} from 'redux-act';
import { login as loginService } from '../services/user';
import { IDispatch, IStoreState } from '../types/app';
import ErrTypes from '../utils/ErrTypes';
import Exception from '../utils/Exception';

const INITIAL_STATE = {
  authToken: null,
  user: null,
}

export const setToken = createAction('set token', token => ({ authToken: token, }));
export const setUser = createAction('set user', (user) => ({ user, }));

export const checkAuth = () => {
  return async(_: IDispatch, getState: () => IStoreState): Promise<boolean> => {
    let state: IStoreState = getState();
    if (!state || !state.app.authToken) {
      return false;
    }

    // checksession
    try {
      return await Taro.checkSession()
    } catch (e) {
      throw new Exception(e.message || e.errMsg, ErrTypes.WX_API_FAIL);
    }
  }
}

export const login = () => {
  return async (dispatch: IDispatch): Promise<any> => {
    try {
      let { user, authToken } = await loginService();

      dispatch(setToken(authToken));
      dispatch(setUser(user));
    } catch (e) {
      throw e;
    }
  }
}

export default createReducer({
  [setToken.toString()]: (state, payload) => {
    return {
      ...state,
      ...payload
    }
  },
  [setUser.toString()]: (state, payload) => {
    return {
      ...state,
      ...payload,
    }
  }
}, INITIAL_STATE);
