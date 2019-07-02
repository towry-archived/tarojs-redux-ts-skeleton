import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createRootReducer, { subscribeToStore } from './reducers';
import { loadLocalState } from './utils/mutateLocalState';

// you can read initial state from localStorge etc.
const initialState = loadLocalState();

const middlewares = [
  thunkMiddleware,
  createLogger(),
]

const enhancers = [];

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
)

const store = createStore(
  createRootReducer(),
  initialState,
  composedEnhancers,
)

subscribeToStore(store);

export default store;
