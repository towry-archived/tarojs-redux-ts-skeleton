
import Taro from '@tarojs/taro';
import createResponse from './createResponse';
import Exception from './Exception';
import ERR_TYPES from './ErrTypes';

const assign = Object.assign;
// interceptor to config the options.
let optionInterceptor = null;
let onErrorInterceptor = (err?: Error) => {
  return Promise.reject(err);
};

export interface FetchOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT" | undefined;
  header?: any;
}

export default function fetch(options: FetchOptions) {
  options = assign({}, options, {
    header: assign({}, {
      'content-type': 'application/json',
    }, options.header),
    method: 'get',
  }, options);

  if (typeof optionInterceptor === 'function') {
    options = optionInterceptor(options);
  }

  console.log(options);

  const request = () => {
    return new Promise((res, rej) => {
      Taro.request(options).then(httpRes => {
        let response = createResponse(httpRes);
        if (!response.ok()) {
          return rej(response.error);
        }
        res(response);
      }, err => {
        return rej(new Exception(err.message || err.errMsg, ERR_TYPES.UNKNOWN));
      })
    })
  }

  return new Promise((res, rej) => {
    request().then(res, (err) => {
      onErrorInterceptor(err).then(() => {
        request().then(res, rej);
      }, () => {
        rej(err);
      });
    })
  })
}

export function setOptionInterceptor(fn) {
  // can only set once.
  if (optionInterceptor) {
    return;
  }
  optionInterceptor = fn;
}

export function setOnErrorInterceptor(fn) {
  onErrorInterceptor = fn;
}

export function get(url: string, options: FetchOptions) {
  options.method = 'GET';
  options.url = url;
  return fetch(options);
}

export function post(url: string, options?: FetchOptions = {}) {
  options.method = 'POST';
  options.url = url;
  return fetch(options);
}

export function put(url: string, options?: FetchOptions) {
  options.method = 'PUT';
  options.url = url;
  return fetch(options);
}

export function del(url: string, options?: FetchOptions) {
  options.method = 'DELETE';
  options.url = url;
  return fetch(options);
}
