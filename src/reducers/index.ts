import { combineReducers, compose } from 'redux'

import counter from './counter'


export default (mergedState) => compose(
  mergedState
)(combineReducers({
  counter
}));
