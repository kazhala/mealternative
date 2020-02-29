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
  yield put({ type: Types.HOME_BEGIN });
  try {
    const response = yield call(Operations.getCategories);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.HOME_STORE_CATEGORY, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.HOME_ERROR, payload: err.message });
  }
}
