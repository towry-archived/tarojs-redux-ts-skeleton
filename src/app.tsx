import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import store from './configureStore';

import {
  setOptionInterceptor,
  setOnErrorInterceptor,
} from './utils/fetch';
import configOptionInterceptor from './utils/configOptionInterceptor';
import onResponseErrorInterceptor from './utils/onResponseErrorInterceptor';
import { login } from './reducers/app';

import './styles/theme/index.scss';
import './static/fonts/iconfont.css';
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  constructor(props: any) {
    super(props);

    configOptionInterceptor(() => {
      return {
        token: store.getState().app.token,
      }
    }, setOptionInterceptor);
    setOnErrorInterceptor((err: Error) => {
      return onResponseErrorInterceptor(err, this.login_);
    });
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#106BA3',
      navigationBarTitleText: 'App',
      navigationBarTextStyle: 'white',
      pageOrientation: 'auto',
    }
  }

  componentDidMount () {
    // check auth.
  }

  /**
   * Do not login in app.
   * Login on the first http request.
   */
  login_ = async () => {
    Taro.showLoading({
      title: 'Loading ..',
    });

    try {
      await store.dispatch(login());

      Taro.hideLoading();
    } catch (e) {
      Taro.hideLoading();

      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
