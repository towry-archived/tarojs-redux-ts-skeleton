declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module 'redux-localstorage-filter';

declare var GLOBAL_VARS: any;
