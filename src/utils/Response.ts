
import getAttr from './getAttr';
import { IResponse } from '../types/app';

const DEF_STATUS = 1;

export default class Response implements IResponse {
  error_: Error | null;
  status_: number;
  data_: any;
  message_: string;
  raw_?: any;

  constructor({
    data = null,
    raw = null,
    status = DEF_STATUS,
    message = ''
  }) {
    // original http response.
    this.raw_ = raw;
    this.error_ = null;
    this.status_ = status;
    this.data_ = data;
    // message from server.
    this.message_ = message;
  }

  clone(): Response {
    let r = new Response({
      data: this.data,
      raw: this.raw_,
      status: this.status,
      message: this.message,
    })

    return r;
  }

  get raw() {
    return this.raw_;
  }

  get data() {
    return this.data_;
  }

  get error() {
    return this.error_;
  }

  set error(err) {
    this.error_ = err;
  }

  get status() {
    return this.status_;
  }

  get message() {
    return this.message_;
  }

  set message(msg) {
    this.message_ = msg;
  }

  unwrap(): any {
    return this.data;
  }

  /**
   * So we can return new response with different data.
   * @example
   * ```js
   * let list = response.get('list');
   * return response.wrap(list);
   *
   * let list = response.unwrap();
   * ```
   * @param o
   */
  wrap(o: any) {
    let r = this.clone();
    r.data_ = o;

    return r;
  }

  ok(): boolean {
    return !this.error;
  }

  get(key: string, defaultValue = null): any {
    return getAttr(key, this.data, defaultValue);
  }

  has(key: string): boolean {
    return this.data && (typeof this.data[key] !== 'undefined') && this.data[key] !== null;
  }
}
