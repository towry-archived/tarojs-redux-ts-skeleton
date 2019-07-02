import { combineReducers } from 'redux'
import throttle from 'lodash/throttle';
import { saveLocalState } from '../utils/mutateLocalState';

import counter from './counter'

export default () => combineReducers({
  counter
});

export const subscribeToStore = (store) => {
  // save to local.
  store.subscribe(throttle(() => {
    let state = store.getState();
    // 这里明确写的state都是要保存到本地的数据.
    // 不许要保存的不要写在这里.
    // app启动时，会被加载到redux初始状态中.
    saveLocalState({
      counter: {
        num: state.counter.num,
      }
    })
  }, 1000));
}
