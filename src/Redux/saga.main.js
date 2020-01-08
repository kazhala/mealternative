/*
  Combines all the Sagas into one Saga
*/

import { all, fork } from 'redux-saga/effects';
import { AuthSagas } from './authentication';

// running all sagas parallel(all) without blocking(fork)
export default function* rootSaga() {
  try {
    yield all([
      fork(AuthSagas.watchSignUp),
      fork(AuthSagas.watchActivate),
      fork(AuthSagas.watchSignIn)
    ]);
  } catch (err) {
    console.log(err);
  }
}
