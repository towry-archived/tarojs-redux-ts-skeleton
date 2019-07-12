import {
  AnyAction,
  Dispatch
} from 'redux';


export type IAnyValue = {
  [prop: string]: string;
} | Array<any> | string | number;


export interface IAppState {
  authToken: string | unknown;
  user: unknown;
}

export interface ICounterState {
  num: number;
}

export type IStoreState = {
  app: IAppState,
  counter: ICounterState,
} | undefined;

export interface User {
  id: number;
}

export interface IResponse {
  raw: any;
  data: any;
  error: Error | null;
  status: number;
  message: string;

  clone(): IResponse;
  unwrap(): any;
  wrap(o: any): IResponse;
  ok(): boolean;
  get(key: string, defaultValue: any): any;
  has(key: string): boolean;
}

export type IDispatch = Dispatch<AnyAction | any>;

export interface IReduxProps {
  dispatch: IDispatch;
}
