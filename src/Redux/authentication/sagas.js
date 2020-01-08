import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher Saga
*/
export function* watchSignUp() {
  yield takeLatest(Types.SIGNUP, workerSignIn);
  yield takeLatest(Types.ACTIVATE, workerActivate);
}

/*
  Worker Saga
*/
function* workerSignIn({ payload }) {
  yield put({ type: Types.BEGIN });
  try {
    let response = yield call(Operations.signIn, payload);
    if (response.message) {
      yield put({ type: Types.SUCCESS, payload: response.message });
    } else if (response.error) {
      throw new Error(response.error);
    }
  } catch (err) {
    yield put({ type: Types.ERROR, payload: err.message });
    console.log('Error', err);
  }
}

function* workerActivate({ payload }) {
  yield put({ type: Types.BEGIN });
  try {
    let response = yield call(Operations.activate, payload);
    console.log(response);
    if (response.error) {
      throw new Error(response.error);
    }
  } catch (err) {
    yield put({ type: Types.ERROR, payload: err.message });
    console.log('Error', err);
  }
}
