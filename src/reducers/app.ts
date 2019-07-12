import {
  createReducer,
  createAction
} from 'redux-act';
import { login as loginService } from '../services/user';
import { IDispatch } from '../types/app';

const INITIAL_STATE = {
  token: null,
  user: null,
}

export const setToken = createAction('set token', token => ({ token, }));
export const setUser = createAction('set user', (user) => ({ user, }));

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
