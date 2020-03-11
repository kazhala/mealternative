/*
  list sagas
*/
import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
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

export function* watchSearchRecipes() {
  yield takeLatest(Types.SEARCH_RECIPES, workerSearchRecipes);
}

/*
  Worker sagas
*/
// search recipes
function* workerSearchRecipes({ payload }) {
  const { search, size } = payload;
  yield put({ type: Types.SEARCH_BEGIN, payload: search });
  try {
    const response = yield call(Operations.searchRecipes, search, size);
    console.log('response', response);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.SEARCH_SUCCESS, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.LIST_ERROR, payload: err.message });
  }
}

// sort recipes
function* workerSortRecipes({ payload }) {
  const { sortOption, size } = payload;
  const { search } = yield select(Operations.getListState);
  yield put({ type: Types.SORT_BEGIN });
  try {
    // get the first page and pass in the sortOption
    let response;
    if (search) {
      response = yield call(
        Operations.searchLoadMore,
        1,
        sortOption,
        search,
        size
      );
    } else {
      response = yield call(Operations.loadMoreRecipes, 1, sortOption, size);
    }
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

// load more recipes
function* workerLoadMoreRecipes() {
  // get the state in store
  const {
    recipePage,
    initialPage,
    recipeSortOption,
    totalPages,
    listCycle,
    search,
    size
  } = yield select(Operations.getListState);

  try {
    // if current page is not the last page
    // and haven't reach to the original starting page
    // perform load next page
    if (
      totalPages !== recipePage &&
      Operations.checkLoadMore(listCycle, initialPage, recipePage)
    ) {
      yield put({ type: Types.LOAD_MORE_BEGIN });
      yield delay(500);

      let response;
      if (search) {
        response = yield call(
          Operations.searchLoadMore,
          recipePage + 1,
          recipeSortOption,
          search,
          size
        );
      } else {
        response = yield call(
          Operations.loadMoreRecipes,
          recipePage + 1,
          recipeSortOption,
          size
        );
      }
      console.log(response);

      if (response.error) {
        throw new Error(response.error);
      } else {
        yield put({ type: Types.LOAD_MORE_SUCCESS, payload: response });
      }
    } else {
      // if stating page is 1, stop loading more, end
      if (initialPage === 1) {
        yield put({ type: Types.LIST_END });
        return;
      }
      // if already cylcled, stop loading more, end
      if (listCycle) {
        yield put({ type: Types.LIST_END });
        return;
      }

      yield put({ type: Types.NEXT_LIST_CYCLE });
      yield put({ type: Types.LOAD_MORE_BEGIN });
      yield delay(500);
      // load first page, start next cycle until the starting page
      const response = yield call(
        Operations.loadMoreRecipes,
        1,
        recipeSortOption,
        size
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

// get initial random recipes
// payload should be the size
function* workerFetchInitRecipes({ payload }) {
  yield put({ type: Types.LIST_BEGIN });
  try {
    const response = yield call(Operations.fetchInitialRecipes, payload);
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
