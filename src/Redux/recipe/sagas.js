/*
  recipe detail saga
*/
import { takeLatest, call, put } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  watcher sagas
*/
export function* watchFetchRecipeDetails() {
  yield takeLatest(Types.FETCH_RECIPE_DETAIL, workerFetchRecipeDetails);
}

/*
  worker sagas
*/
function* workerFetchRecipeDetails({ payload }) {
  const { recipeid } = payload;
  yield put({ type: Types.RECIPE_BEGIN });
  try {
    const response = yield call(Operations.fetchRecipeDetails, recipeid);
    console.log(response);
  } catch (err) {
    console.log(err);
    yield put({ type: Types.RECIPE_ERROR, payload: err.message });
  }
}
