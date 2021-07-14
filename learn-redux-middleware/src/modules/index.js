import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import loading from './loading';
import sample, { sampleSaga } from './sample';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ counter, sample, loading });

export function* rootSaga() {
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
