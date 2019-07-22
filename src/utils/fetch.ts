
import Taro from '@tarojs/taro';
import createResponse from './createResponse';
import Exception from './Exception';
import ERR_TYPES from './ErrTypes';
import { IResponse } from 'src/types/app';

const assign = Object.assign;
// interceptor to config the options.
let optionInterceptor: <T>(options: T) => T;
let onErrorInterceptor = (err?: Error) => {
  return Promise.reject(err);
};

export interface FetchOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE" | "CONNECT" | undefined;
  header?: any;
  data?: any,
}

export default function fetch(options: FetchOptions): Promise<IResponse> {
  options = assign({}, options, {
    header: assign({}, {
      'content-type': 'application/json',
    }, options.header),
    method: 'get',
  }, options);

  const request = () => {
    if (typeof optionInterceptor === 'function') {
      options = optionInterceptor(options);
    }

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

export function get(url: string, options: Partial<FetchOptions>): Promise<IResponse> {
  return fetch(Object.assign({
    url,
    method: 'GET'
  }, options));
}

export function post(url: string, options: Partial<FetchOptions>): Promise<IResponse> {
  return fetch(Object.assign({
    url,
    method: 'POST',
  }, options));
}

export function put(url: string, options: Partial<FetchOptions>): Promise<IResponse> {
  return fetch(Object.assign({
    url,
    method: 'PUT',
  }, options));
}

export function del(url: string, options: Partial<FetchOptions>): Promise<IResponse> {
  return fetch(Object.assign({
    url,
    method: 'DELETE',
  }, options));
}
