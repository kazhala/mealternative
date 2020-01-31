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
  yield console.log(recipeid);
}
