/*
  sagas for update redux
*/
import { takeLatest, call, put } from 'redux-saga/effects';
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
  yield put({ type: Types.UPDATE_BEGIN });
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
  const { recipeDetail, selCategoryIds } = payload;
  // prepare required params to call backend
  const uploadParams = {
    title: recipeDetail.title,
    description: recipeDetail.description,
    ingredients: [...recipeDetail.ingredients],
    categories: [...selCategoryIds]
  };
  yield console.log(uploadParams);

  yield put({ type: Types.UPDATE_BEGIN });
  try {
    // client side validation, don't waste usage in cloudinary
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

    recipeDetail.steps.forEach(step => {
      if ((step.stepTitle.length < 3) | (step.stepTitle.length > 60)) {
        throw new Error('Each step require a title between 3-60');
      }
      if (step.stepDescriptions.length > 1000) {
        throw new Error("Description can't exceed 1000 in lenght");
      }
    });

    // if there is thumbnailImage, upload to cloudinary
    if (recipeDetail.thumbnailImage.file && !recipeDetail.thumbnailImage.url) {
      console.log('Uploading thumbnail');
      yield put({
        type: Types.UPDATE_LOADING_TEXT,
        payload: 'Uploading thumbnail..'
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
        uploadParams.thumbImageUrl = thumbResponse.secure_url;
      } else {
        throw new Error('Something went wrong..');
      }
    }
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.UPDATE_ERROR, payload: err.message });
  }
}
