/*
  Combines all the Sagas into one Saga
*/

import { all, fork } from 'redux-saga/effects';
import { AuthSagas } from './authentication';

export default function* rootSaga() {
  try {
    yield all([fork(AuthSagas.watchSignUp)]);
  } catch (err) {
    console.log(err);
  }
}
