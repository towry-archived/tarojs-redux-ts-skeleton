import { createReducer, createAction } from 'redux-act';

const INITIAL_STATE = {
  num: 0
}

export const add = createAction('add');
export const minus = createAction('minus');

export default createReducer({
  [add.toString()]: (state) => {

    return { ...state, num: state.num + 1 }
  },

  [minus.toString()]: (state) => {
    return { ...state, num: state.num - 1 }
  }
}, INITIAL_STATE);
