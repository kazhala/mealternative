/*
  category sagas
*/
import * as Types from './types';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as Operations from './operations';

/*
  watcher sagas
*/
export function* watchGetCategoryRecipes() {
  yield takeLatest(Types.CATEGORY_GET_RECIPES, workerGetCategoryRecipes);
}

export function* watchLoadMoreRecipe() {
  yield takeLatest(Types.CATEGORY_LOADMORE, workerLoadMoreRecipe);
}

/*
  worker sagas
*/
function* workerGetCategoryRecipes({ payload }) {
  yield put({ type: Types.CATEGORY_BEGIN });
  try {
    const response = yield call(Operations.getCategoryRecipes, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.CATEGORY_STORE_RECIPES, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.CATEGOR_ERROR, payload: err.message });
  }
}

function* workerLoadMoreRecipe() {
  yield console.log('hello');
}
