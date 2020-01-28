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

/*
  Worker sagas
*/
function* workerLoadMoreRecipes() {
  const listState = yield select(Operations.getListState);
  try {
    if (listState.hasNextPage) {
      yield put({ type: Types.LOAD_MORE_BEGIN });
      const response = yield call(
        Operations.loadMoreRecipes,
        listState.recipePage + 1,
        listState.recipeSortOption
      );
      console.log(response);
      if (response.error) {
        throw new Error(response.error);
      } else {
        if (response.response.length < 10) {
          yield put({ type: Types.SET_NEXT_PAGE, payload: false });
        } else {
          yield put({ type: Types.SET_NEXT_PAGE, payload: true });
        }
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
      if (response.response.length < 10) {
        yield put({ type: Types.SET_NEXT_PAGE, payload: false });
      } else {
        yield put({ type: Types.SET_NEXT_PAGE, payload: true });
      }
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
