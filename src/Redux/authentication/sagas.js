/*
  Auth saga to handle async calls
*/
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

// sign up worker
function* workerSignUp({ payload }) {
  // begin
  yield put({ type: Types.BEGIN });
  try {
    // call backend
    let response = yield call(Operations.signUp, payload);
    // return response or throw error
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

// account activation worker
function* workerActivate({ payload }) {
  // begin
  yield put({ type: Types.BEGIN });
  try {
    // call backend
    let response = yield call(Operations.activate, payload);
    if (response.message) {
      // on success activate, sign user in
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

// sign in worker
function* workerSignIn({ payload }) {
  // beigin
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
