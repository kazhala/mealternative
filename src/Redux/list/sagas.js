/*
  list sagas
*/
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  Watcher sagas
*/
export function* watchFetchInitRecipes() {
  yield takeLatest(Types.FETCH_INITIAL_RECIPES, workerFetchInitRecipes);
}

export function* watchLoadMoreRecipes() {
  yield takeLatest(Types.LOAD_MORE_RECIPES, workerLoadMoreRecipes);
}

export function* watchSortRecipes() {
  yield takeLatest(Types.FETCH_SORT_RECIPES, workerSortRecipes);
}

/*
  Worker sagas
*/
function* workerSortRecipes({ payload }) {
  yield put({ type: Types.SORT_BEGIN });
  try {
    const response = yield call(Operations.loadMoreRecipes, 1, payload);
    console.log(response);
    if (response.error) {
      throw new Error(response.error);
    } else {
      yield put({ type: Types.SUCCESS_SORT_RECIPES, payload: response });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: Types.LIST_ERROR, payload: err.message });
  }
}

function* workerLoadMoreRecipes() {
  const {
    recipePage,
    initialPage,
    recipeSortOption,
    totalPages,
    listCycle
  } = yield select(Operations.getListState);
  try {
    if (
      totalPages !== recipePage &&
      Operations.checkLoadMore(listCycle, initialPage, recipePage)
    ) {
      yield put({ type: Types.LOAD_MORE_BEGIN });
      const response = yield call(
        Operations.loadMoreRecipes,
        recipePage + 1,
        recipeSortOption
      );
      console.log(response);

      if (response.error) {
        throw new Error(response.error);
      } else {
        yield put({ type: Types.LOAD_MORE_SUCCESS, payload: response });
      }
    } else {
      if (initialPage === 1) return;
      if (listCycle) return;

      yield put({ type: Types.NEXT_LIST_CYCLE });
      yield put({ type: Types.LOAD_MORE_BEGIN });
      const response = yield call(
        Operations.loadMoreRecipes,
        1,
        recipeSortOption
      );
      console.log(response);
      if (response.error) {
        throw new Error(response.error);
      } else {
        yield put({ type: Types.LOAD_MORE_SUCCESS, payload: response });
      }
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: Types.LIST_ERROR,
      payload: err.message
    });
  }
}

function* workerFetchInitRecipes() {
  yield put({ type: Types.LIST_BEGIN });
  try {
    const response = yield call(Operations.fetchInitialRecipes);
    if (response.error) {
      throw new Error(response.error);
    } else {
      console.log(response);
      yield put({
        type: Types.SUCESS_INITIAL_RECIPES,
        payload: response
      });
    }
  } catch (err) {
    yield put({
      type: Types.LIST_ERROR,
      payload: err.message
    });
  }
}
