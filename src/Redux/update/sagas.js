/*
  sagas for update redux
*/
import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  watcher sagas
*/
export function* watchGetRecipeDetails() {
  yield takeLatest(Types.UPDATE_GET_RECIPE, workerGetRecipeDetails);
}

/*
  worker sagas
*/
function* workerGetRecipeDetails({ payload }) {
  yield put({ type: Types.UPDATE_BEGIN });
  try {
    const response = yield call(Operations.getRecipeDetails, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.UPDATE_STORE_RECIPE, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.UPDATE_ERROR, payload: err.message });
  }
}
