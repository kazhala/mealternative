/*
  recipe detail saga
*/
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  watcher sagas
*/
export function* watchFetchRecipeDetails() {
  yield takeLatest(Types.FETCH_RECIPE_DETAIL, workerFetchRecipeDetails);
}

export function* watchIncrementLike() {
  yield takeLatest(Types.RECIPE_LIKE, workerIncrementLike);
}

export function* watchIncrementBook() {
  yield takeLatest(Types.RECIPE_BOOK, workerIncrementBook);
}

export function* watchRateRecipe() {
  yield takeLatest(Types.RECIPE_RATE, workerRateRecipe);
}

/*
  worker sagas
*/
function* workerRateRecipe({ payload }) {
  const { recipeDetails } = yield select(Operations.getRecipeState);
  try {
    const response = yield call(
      Operations.rateRecipe,
      recipeDetails._id,
      payload
    );
    console.log('response', response);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.RECIPE_MESSAGE, payload: response.message });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.RECIPE_ERROR, payload: err.message });
  }
}

function* workerIncrementBook() {
  const { recipeDetails } = yield select(Operations.getRecipeState);
  try {
    const response = yield call(Operations.incrementBook, recipeDetails._id);
    console.log('response', response);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.RECIPE_MESSAGE, payload: response.message });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.RECIPE_ERROR, payload: err.message });
  }
}

function* workerIncrementLike() {
  const { recipeDetails } = yield select(Operations.getRecipeState);
  try {
    const response = yield call(Operations.incrementLike, recipeDetails._id);
    console.log('response', response);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.RECIPE_MESSAGE, payload: response.message });
  } catch (err) {
    console.log(err);
    yield put({ type: Types.RECIPE_ERROR, payload: err.message });
  }
}

function* workerFetchRecipeDetails({ payload }) {
  const { recipeid } = payload;
  const { isAuthenticated, user } = yield select(Operations.getAuthState);
  yield put({ type: Types.RECIPE_BEGIN });
  try {
    let response;
    if (isAuthenticated) {
      response = yield call(Operations.authRecipeDetails, recipeid, user._id);
    } else {
      response = yield call(Operations.fetchRecipeDetails, recipeid);
    }
    if (response.error) {
      throw new Error(response.error);
    } else {
      console.log(response);
      yield put({ type: Types.FETCH_RECIPE_SUCCESS, payload: response });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: Types.RECIPE_ERROR, payload: err.message });
  }
}
