import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher Saga
*/
export function* watchSignUp() {
  yield takeLatest(Types.SIGNUP, workerSignIn);
}

/*
  Worker Saga
*/
function* workerSignIn({ payload }) {
  yield console.log(payload);
}
