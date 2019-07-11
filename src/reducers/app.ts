import {
  createReducer,
  // createAction
} from 'redux-act';

const INITIAL_STATE = {
  token: null,
  user: null,
}

export default createReducer({
}, INITIAL_STATE);
