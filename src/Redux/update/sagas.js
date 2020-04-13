/*
  sagas for update redux
*/
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';
import * as CreateOperations from '../create/operations';

/*
  watcher sagas
*/
export function* watchGetRecipeDetails() {
  yield takeLatest(Types.UPDATE_GET_RECIPE, workerGetRecipeDetails);
}

export function* watchUpdateRecipe() {
  yield takeLatest(Types.UPDATE_RECIPE, workerUpdateRecipe);
}

/*
  worker sagas
*/
function* workerGetRecipeDetails({ payload }) {
  yield put({ type: Types.UPDATE_INIT });
  try {
    const response = yield call(Operations.getRecipeDetails, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.UPDATE_STORE_RECIPE, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.UPDATE_ERROR, payload: err.message });
  }
}

// update recipe
// step1 validate input
// step2 upload thumbnail to cloudinary
// step3 upload all step images to cloudinary
// store recipe in backend once all url are created
function* workerUpdateRecipe({ payload }) {
  const { recipeDetail, selCategoryIds, recipeId } = payload;
  // prepare required params to call backend
  const updateParams = {
    id: recipeId,
    title: recipeDetail.title,
    description: recipeDetail.description,
    ingredients: [...recipeDetail.ingredients],
    categories: [...selCategoryIds],
    thumbImageUrl: recipeDetail.thumbnailImage.url,
  };
  yield console.log(updateParams);

  yield put({ type: Types.UPDATE_BEGIN });
  try {
    // client side validation, don't waste usage in cloudinary
    if (updateParams.title.length < 3) {
      throw new Error('Recipe title should be at least 3 characters long');
    }
    if (updateParams.ingredients.length < 1) {
      throw new Error('Please enter some required ingredients');
    }
    if (updateParams.categories.length < 1) {
      throw new Error('Please select at least one category');
    }

    recipeDetail.steps.forEach((step) => {
      if (step.stepTitle.length < 3) {
        throw new Error('Each step require a title at least 3 characters');
      }
    });

    // if there is thumbnailImage, upload to cloudinary
    if (recipeDetail.thumbnailImage.file && !recipeDetail.thumbnailImage.url) {
      console.log('Uploading thumbnail');
      yield put({
        type: Types.UPDATE_LOADING_TEXT,
        payload: 'Uploading thumbnail..',
      });
      const thumbResponse = yield call(
        CreateOperations.uploadRecipeThumb,
        recipeDetail.thumbnailImage.file
      );
      if (thumbResponse.error) {
        throw new Error(thumbResponse.error.message);
      }
      // put the url in params
      if (thumbResponse.secure_url) {
        updateParams.thumbImageUrl = thumbResponse.secure_url;
      } else {
        throw new Error('Something went wrong..');
      }
    }

    // prepare steps params
    const uploadSteps = [];
    // check each step if need to upload image
    for (let i = 0; i < recipeDetail.steps.length; i++) {
      let eachStep = {};
      eachStep.stepTitle = recipeDetail.steps[i].stepTitle;
      eachStep.stepDescriptions = recipeDetail.steps[i].stepDescriptions;
      // if file, upload image
      if (recipeDetail.steps[i].stepImage.file) {
        console.log(`Uploading ${recipeDetail.steps[i].stepTitle}'s image..'`);
        yield put({
          type: Types.UPDATE_LOADING_TEXT,
          payload: `Uploading ${recipeDetail.steps[i].stepTitle}'s image..'`,
        });
        let stepResponse = yield call(
          CreateOperations.uploadStepImage,
          recipeDetail.steps[i].stepImage.file
        );
        if (stepResponse.error) {
          throw new Error(stepResponse.error.message);
        }
        // store the url
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
    updateParams.steps = [...uploadSteps];

    console.log(updateParams);
    yield put({
      type: Types.UPDATE_LOADING_TEXT,
      payload: 'Uploading recipe..',
    });
    const response = yield call(Operations.updateRecipe, updateParams);
    if (response.error) {
      throw new Error(response.error);
    } else {
      yield put({
        type: Types.UPDATE_LOADING_TEXT,
        payload: 'Success! Redirecting..',
      });
      yield delay(1000);
      yield put({ type: Types.UPDATE_SUCCESS });
    }
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.UPDATE_ERROR, payload: err.message });
  }
}
