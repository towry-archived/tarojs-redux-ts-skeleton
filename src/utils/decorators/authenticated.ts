import { getStore } from '@tarojs/redux';

import Taro from '@tarojs/taro';
import log from '../log';

/**
 * Make sure page is authenticated.
 * @example
 * ```
 * @authenticated
 * export default class App extends Component {
 *
 * }
 */

// Todo: add onFail option.

import { login, checkAuth } from '../../reducers/app';

export default function authenticated() {
  const store = getStore();
  const dispatch = store.dispatch;

  return function authenticatedComponent(TaroComponent) {

    class AuthenticatedComponent extends TaroComponent {
      componentDidShow() {
        // check auth.
        dispatch(checkAuth()).then((valid) => {
          if (!valid) {
            this.qx_login_$_();
          } else {
            log('weixin session is valid');

            if (typeof super.onAuthenticated === 'function') {
              super.onAuthenticated();
            }
          }
        }).catch (() => {
          // session timeout
          this.qx_login_$_();
        });

        // call parent method.
        if (super.componentDidShow) {
          super.componentDidShow();
        }
      }

      qx_login_$_ = async () => {
        Taro.showLoading({
          title: 'Loading ..',
        });

        try {
          await store.dispatch(login());

          // notify parent about login.
          if (typeof super.onAuthenticated === 'function') {
            super.onAuthenticated();
          }

          Taro.hideLoading();
        } catch (e) {
          Taro.hideLoading();
          throw e;
          // Taro.showToast({
          //   icon: 'none',
          //   duration: 3500,
          //   title: e.message,
          // })
        }
      }
    }

    return AuthenticatedComponent;
  }
}
