import { takeLatest, put, call } from 'redux-saga/effects';
import * as Types from './types';

export function* watchProfileGetUser() {
  yield takeLatest(Types.PROFILE_GET_USER, workerProfileGetUser);
}

function* workerProfileGetUser({ payload }) {
  yield console.log(payload);
}
