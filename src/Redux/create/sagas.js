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
}

export function* watchSubmitRecipe() {
  yield takeLatest(Types.CREATE_SUBMIT_RECIPE, workerSubmitRecipe);
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
        type: Types.CREAT_ERROR,
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
  yield put({ type: Types.CREATE_BEGIN });
  console.log(payload);
  try {
    if (
      payload.thumbnailImage.file !== '' &&
      payload.thumbnailImage.url === ''
    ) {
      yield put({
        type: Types.CREATE_LOADING_TEXT,
        payload: 'Uploading thumbnail..'
      });
      const response = yield call(
        Operations.uploadRecipeThumb
        // payload.thumbnailImage.file
      );
      console.log(response);
      if (response.error) {
        throw new Error(response.error.message);
      }
    }
  } catch (err) {
    console.log(err);
    yield put({ type: Types.CREAT_ERROR, payload: err.message });
  }
}
