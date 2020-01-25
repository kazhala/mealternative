/*
  Create saga to handle async calls
*/
import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher saga
*/
export function* watchGetCategories() {
  yield takeLatest(Types.GET_CATEGORIES, workerGetCategories);
  yield takeLatest(Types.SUBMIT_RECIPE, workerSubmitRecipe);
}

/*
  Worker saga
*/
function* workerGetCategories() {
  yield put({ type: Types.BEGIN_CATEGORIES });
  try {
    const response = yield call(Operations.getCategories);
    if (response.error) {
      yield put({
        type: Types.ERROR,
        payload: 'Categories faild to fetch, try refresh..'
      });
    } else {
      yield put({ type: Types.SUCCESS_CATEGORIES, payload: response });
    }
  } catch (err) {
    console.log(err);
  }
}

function* workerSubmitRecipe({ payload }) {
  yield put({ type: Types.BEGIN });
}
