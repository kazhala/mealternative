/*
  Create saga to handle async calls
*/
import { takeLatest, call, put, delay } from 'redux-saga/effects';
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
  const { recipeDetail, selCategoryIds } = payload;
  const uploadParams = {
    title: recipeDetail.title,
    description: recipeDetail.description,
    ingredients: [...recipeDetail.ingredients],
    categories: [...selCategoryIds]
  };
  console.log(uploadParams);
  yield put({ type: Types.CREATE_BEGIN });

  try {
    if (uploadParams.title.length < 3 || uploadParams.title.length > 60) {
      throw new Error('Recipe title should be between 3-60 characters long');
    }
    if (uploadParams.description.length > 1000) {
      throw new Error("Description can't be longer 1000");
    }
    if (uploadParams.ingredients.length < 1) {
      throw new Error('Please enter some required ingredients');
    }
    if (uploadParams.categories.length < 1) {
      throw new Error('Please select at least one category');
    }
    if (recipeDetail.thumbnailImage.file && !recipeDetail.thumbnailImage.url) {
      console.log('Uploading thumbnail');
      yield put({
        type: Types.CREATE_LOADING_TEXT,
        payload: 'Uploading thumbnail..'
      });
      const thumbResponse = yield call(
        Operations.uploadRecipeThumb,
        recipeDetail.thumbnailImage.file
      );
      if (thumbResponse.error) {
        throw new Error(thumbResponse.error.message);
      }
      if (thumbResponse.secure_url) {
        uploadParams.thumbImageUrl = thumbResponse.secure_url;
      } else {
        throw new Error('Something went wrong..');
      }
    }

    const uploadSteps = [];
    for (let i = 0; i < recipeDetail.steps.length; i++) {
      let eachStep = {};
      eachStep.stepTitle = recipeDetail.steps[i].stepTitle;
      eachStep.stepDescriptions = recipeDetail.steps[i].stepDescriptions;
      if (recipeDetail.steps[i].stepImage.file) {
        console.log(`Uploading ${recipeDetail.steps[i].stepTitle}'s image..'`);
        yield put({
          type: Types.CREATE_LOADING_TEXT,
          payload: `Uploading ${recipeDetail.steps[i].stepTitle}'s image..'`
        });
        let stepResponse = yield call(
          Operations.uploadStepImage,
          recipeDetail.steps[i].stepImage.file
        );
        if (stepResponse.error) {
          throw new Error(stepResponse.error.message);
        }
        if (stepResponse.secure_url) {
          eachStep.stepImageUrl = stepResponse.secure_url;
        } else {
          throw new Error('Something went wrong..');
        }
      } else {
        eachStep.stepImageUrl = recipeDetail.steps[i].stepImage.url;
      }
      uploadSteps.push(eachStep);
    }
    uploadParams.steps = [...uploadSteps];

    console.log(uploadParams);
    yield put({
      type: Types.CREATE_LOADING_TEXT,
      payload: 'Uploading recipe..'
    });
    const response = yield call(Operations.uploadRecipe, uploadParams);
    if (response.error) {
      throw new Error(response.error);
    } else {
      yield put({
        type: Types.CREATE_LOADING_TEXT,
        payload: 'Success! Redirecting..'
      });
      yield delay(3000);
      yield put({ type: Types.CREATE_SUCCESS, payload: response.message });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: Types.CREAT_ERROR, payload: err.message });
  }
}
