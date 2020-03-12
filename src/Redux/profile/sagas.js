/*
  Profile page saga handlers
*/
import { takeLatest, put, call, delay, select } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

/*
  watcher sagas
*/
export function* watchProfileGetUser() {
  yield takeLatest(Types.PROFILE_GET_USER, workerProfileGetUser);
}

export function* watchProfileUpdateUser() {
  yield takeLatest(Types.PROFILE_UPDATE_USER, workerProfileUpdateUser);
}

export function* watchProfileGetBookmarks() {
  yield takeLatest(Types.PROFILE_GET_BOOKMARKS, workerProfileGetBookmarks);
}

export function* watchProfileGetRecipes() {
  yield takeLatest(Types.PROFILE_GET_RECIPES, workerProfileGetRecipes);
}

export function* watchRemoveRecipe() {
  yield takeLatest(Types.PROFILE_REMOVE_RECIPE, workerRemoveRecipe);
}

export function* watchUpdatePassword() {
  yield takeLatest(Types.PROFILE_UPDATE_PASSWORD, workerUpdatePassword);
}

export function* watchLoadMoreRecipes() {
  yield takeLatest(Types.PROFILE_LOADMORE_RECIPES, workerLoadMoreRecipes);
}

export function* watchLoadMoreBookmarks() {
  yield takeLatest(Types.PROFILE_LOADMORE_BOOKMARKS, workerLoadMoreBookmarks);
}

/*
  worker sagas
*/
function* workerLoadMoreBookmarks({ payload }) {
  const { bookmarkPage, totalBookmarkPage } = yield select(
    Operations.getProfileState
  );
  try {
    if (bookmarkPage !== totalBookmarkPage) {
      const response = yield call(
        Operations.getProfileBookmarks,
        payload,
        bookmarkPage + 1
      );
      if (response.error) {
        throw new Error(response.error);
      }
      yield put({
        type: Types.PROFILE_LOADMORE_BOOKMARKS_SUCCESS,
        payload: response
      });
    } else {
      yield put({ type: Types.PROFILE_END });
    }
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerLoadMoreRecipes({ payload }) {
  const { recipePage, totalRecipePage } = yield select(
    Operations.getProfileState
  );
  try {
    if (recipePage !== totalRecipePage) {
      const response = yield call(
        Operations.getProfileRecipes,
        payload,
        recipePage + 1
      );
      if (response.error) {
        throw new Error(response.error);
      }
      yield put({
        type: Types.PROFILE_LOADMORE_RECIPES_SUCCESS,
        payload: response
      });
    } else {
      yield put({ type: Types.PROFILE_END });
    }
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

// update password
function* workerUpdatePassword({ payload }) {
  const { oldPassword, newPassword, confirmPassword } = payload;
  yield put({ type: Types.PROFILE_BEGIN });
  try {
    // validate
    if (newPassword !== confirmPassword) {
      throw new Error('Password did not match');
    }
    if (!window.confirm('Are you sure you want to update your password')) {
      throw new Error('Password update canceled by user');
    }
    const response = yield call(
      Operations.updatePassword,
      oldPassword,
      newPassword
    );
    if (response.error) {
      throw new Error(response.error);
    }
    // no need for other success state, clear loading and erro state on success
    // dispatch the info next
    yield put({ type: Types.PROFILE_CLEAR });
    yield put({ type: Types.PROFILE_INFO, payload: response.message });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerRemoveRecipe({ payload }) {
  try {
    // remove the recipe
    const response = yield call(Operations.removeRecipe, payload.recipeId);
    if (response.error) {
      throw new Error(response.error);
    }
    // display success message
    yield put({ type: Types.PROFILE_INFO, payload: response.message });
    // reload the recipe list
    yield call(workerProfileGetRecipes, { payload: payload.userId });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerProfileGetRecipes({ payload }) {
  // const { recipePage } = yield select(Operations.getProfileState);
  // start loading
  yield put({ type: Types.RECIPES_BEGIN });
  try {
    // get recipes
    const response = yield call(Operations.getProfileRecipes, payload, 1);
    if (response.error) {
      throw new Error(response.error);
    }
    // store recipes
    yield put({ type: Types.PROFILE_STORE_RECIPES, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerProfileGetBookmarks({ payload }) {
  // start loading
  yield put({ type: Types.BOOKMARKS_BEGIN });
  try {
    // fetch all bookmarks
    const response = yield call(Operations.getProfileBookmarks, payload, 1);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.PROFILE_STORE_BOOKMARKS, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

function* workerProfileGetUser({ payload }) {
  // loading
  yield put({ type: Types.DETAIL_BEGIN });
  try {
    // get user details
    const response = yield call(Operations.getProfileDetails, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: Types.PROFILE_STORE_USER, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}

// update user details
function* workerProfileUpdateUser({ payload }) {
  // loading, page wide loading indicator
  yield put({ type: Types.PROFILE_BEGIN });
  // copy the params, don't alter state
  const uploadParams = { ...payload };
  try {
    // validate username existence through backend first
    let response = yield call(
      Operations.validateName,
      uploadParams._id,
      uploadParams.username
    );
    if (response.error) {
      throw new Error('username already exists');
    }

    // upload image to cloudinary
    if (uploadParams.newImageFile) {
      yield put({
        type: Types.PROFILE_LOADING_TEXT,
        payload: 'Uploading profile image..'
      });
      const response = yield call(
        Operations.uploadProfileImage,
        payload.newImageFile
      );
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.secure_url) {
        uploadParams.photoUrl = response.secure_url;
      } else {
        throw new Error('Something went wrong..');
      }
    }
    // clear unnecessay fields
    uploadParams.newImageFile = undefined;
    yield put({ type: Types.PROFILE_LOADING_TEXT, payload: 'Updating..' });
    // update the details
    response = yield call(Operations.updateProfileDetails, uploadParams);
    if (response.error) {
      throw new Error(response.error);
    }
    // delay 1sec for better ux
    yield delay(1000);
    yield put({ type: Types.PROFILE_STORE_USER, payload: response });
    yield put({ type: Types.PROFILE_INFO, payload: 'Update success' });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}
