import { takeLatest, put, call } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

export function* watchProfileGetUser() {
  yield takeLatest(Types.PROFILE_GET_USER, workerProfileGetUser);
}

export function* watchProfileUpdateUser() {
  yield takeLatest(Types.PROFILE_UPDATE_USER, workerProfileUpdateUser);
}

function* workerProfileGetUser({ payload }) {
  yield put({ type: Types.PROFILE_BEGIN });
  try {
    const response = yield call(Operations.getProfileDetails, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.PROFILE_STORE_USER, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerProfileUpdateUser({ payload }) {
  yield console.log(payload);
}
