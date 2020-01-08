import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher Saga
*/
export function* watchSignUp() {
  yield takeLatest(Types.SIGNUP, workerSignUp);
}

export function* watchActivate() {
  yield takeLatest(Types.ACTIVATE, workerActivate);
}

export function* watchSignIn() {
  yield takeLatest(Types.SIGNIN, workerSignIn);
}

/*
  Worker Saga
*/
function* workerSignUp({ payload }) {
  yield put({ type: Types.BEGIN });
  try {
    let response = yield call(Operations.signUp, payload);
    if (response.message) {
      yield put({ type: Types.SUCCESS, payload: response.message });
    } else if (response.error) {
      throw new Error(response.error);
    } else {
      throw new Error('Something went wrong..');
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
    if (response.message) {
      yield put({ type: Types.SIGNIN, payload });
    } else if (response.error) {
      throw new Error(response.error);
    } else {
      throw new Error('Something went wrong..');
    }
  } catch (err) {
    yield put({ type: Types.ERROR, payload: err.message });
    console.log('Error', err);
  }
}

function* workerSignIn({ payload }) {
  yield put({ type: Types.BEGIN });
  try {
    let response = yield call(Operations.signIn, payload);
    if (response.token) {
      yield call(Operations.authenticate, response);
      yield put({ type: Types.SUCCESS, payload: 'Sign in success!' });
    } else if (response.error) {
      throw new Error(response.error);
    } else {
      throw new Error('Something went wrong..');
    }
  } catch (err) {
    yield put({ type: Types.ERROR, payload: err.message });
    console.log('Error', err);
  }
}
