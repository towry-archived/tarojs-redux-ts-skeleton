import Taro from '@tarojs/taro'

const KEY = '_redux_local_state';

export function saveLocalState(state) {
  try {
    Taro.setStorageSync(KEY, JSON.stringify(state))
  } catch (e) { };
}

export function loadLocalState() {
  try {
    const seriliazedState = Taro.getStorageSync(KEY);
    if (seriliazedState === null) {
      return undefined;
    }

    return JSON.parse(seriliazedState);
  } catch (err) {
    return undefined;
  }
}
