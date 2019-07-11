import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createRootReducer from './reducers';
import filter from 'redux-localstorage-filter';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import localStorageAdapter from './utils/localStorage';
import { IStoreState } from './types/app'

const initialState = undefined;

const middlewares = [
  thunkMiddleware,
  createLogger(),
]

const storage = compose(
  // only cache app.
  filter('app')
)(adapter(localStorageAdapter));


const enhancers = [
  persistState(storage, '_redux_local_state'),
];

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
)

const store = createStore<IStoreState, any, any, any>(
  createRootReducer(mergePersistedState()),
  initialState,
  composedEnhancers,
)

export default store;
