import {
  createReducer,
  createAction
} from 'redux-act';

const INITIAL_STATE = {
  token: null,
  user: null,
}

const setToken = createAction('set token', token => ({ token, }));

export const login = () => {
  return (dispatch, getState) => {

  }
}

export default createReducer({
  [setToken.toString()]: (state, payload) => {
    return {
      ...state,
      ...payload
    }
  }
}, INITIAL_STATE);
