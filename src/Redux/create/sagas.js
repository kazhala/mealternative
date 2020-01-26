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
    if (payload.thumbnailImage.file && !payload.thumbnailImage.url) {
      yield put({
        type: Types.CREATE_LOADING_TEXT,
        payload: 'Uploading thumbnail..'
      });
      const thumbResponse = yield call(
        Operations.uploadRecipeThumb,
        payload.thumbnailImage.file
      );
      if (thumbResponse.error) {
        throw new Error(thumbResponse.error.message);
      }
      if (thumbResponse.secure_url) {
        payload.thumbnailImage.url = thumbResponse.secure_url;
      } else {
        throw new Error('Something went wrong..');
      }
      console.log(payload);
    }
    for (let i = 0; i < payload.steps.length; i++) {
      if (payload.steps[i].stepImage.file) {
        yield put({
          type: Types.CREATE_LOADING_TEXT,
          payload: `Uploading ${payload.steps[i].stepTitle}'s image..'`
        });
        let stepResponse = yield call(
          Operations.uploadStepImage,
          payload.steps[i].stepImage.file
        );
        if (stepResponse.error) {
          throw new Error(stepResponse.error.message);
        }
        if (stepResponse.secure_url) {
          payload.steps[i].stepImage.url = stepResponse.secure_url;
        } else {
          throw new Error('Something went wrong..');
        }
      }
    }
    console.log(payload);
  } catch (err) {
    console.log(err);
    yield put({ type: Types.CREAT_ERROR, payload: err.message });
  }
}
