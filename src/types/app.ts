export type IAnyValue = {
  [prop: string]: string;
} | Array<any> | string | number;


export interface IAppState {
  token: string | unknown;
  user: unknown;
}

export interface ICounterState {
  num: number;
}

export type IStoreState = {
  app: IAppState,
  counter: ICounterState,
} | undefined;
