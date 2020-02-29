/*
  sagas for home redux
*/
import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  watch sagas
*/
export function* watchGetCategories() {
  yield takeLatest(Types.HOME_GET_CATEGORY, workerGetCategories);
}

/*
  worker sagas
*/
function* workerGetCategories() {
  yield console.log('hello');
}
