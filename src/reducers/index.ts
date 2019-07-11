import { combineReducers, compose } from 'redux'

import app from './app';
import counter from './counter'

export default (mergedState) => compose(
  mergedState
)(combineReducers({
  app,
  counter,
}));
