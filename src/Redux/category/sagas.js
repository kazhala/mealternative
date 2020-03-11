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

export function* watchLoadMoreRecipes() {
  yield takeLatest(Types.CATEGORY_LOADMORE, workerLoadMoreRecipes);
}

/*
  worker sagas
*/
function* workerGetCategoryRecipes({ payload }) {
  const { sortOption } = yield select(Operations.getCategoryState);
  const { id, size } = payload;
  yield put({ type: Types.CATEGORY_BEGIN });
  try {
    const response = yield call(
      Operations.getCategoryRecipes,
      id,
      sortOption,
      size
    );
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.CATEGORY_STORE_RECIPES, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.CATEGOR_ERROR, payload: err.message });
  }
}

function* workerLoadMoreRecipes() {
  const { page, totalPages, category, sortOption, size } = yield select(
    Operations.getCategoryState
  );
  if (page < totalPages) {
    yield put({ type: Types.CATEGORY_LOADMORE_LOADING });
    try {
      const response = yield call(
        Operations.loadMoreRecipes,
        category._id,
        sortOption,
        page + 1,
        size
      );
      if (response.error) {
        throw new Error(response.error);
      }
      yield put({ type: Types.CATEGORY_LOADMORE_SUCCESS, payload: response });
    } catch (err) {
      console.log('Error', err);
      yield put({ type: Types.CATEGOR_ERROR, payload: err.message });
    }
  } else {
    yield put({ type: Types.CATEGORY_END });
  }
}
