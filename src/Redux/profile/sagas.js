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

/*
  worker sagas
*/
function* workerProfileGetBookmarks() {
  // start loading
  yield put({ type: Types.BOOKMARKS_BEGIN });
  // get the userId from redux state
  const { user } = yield select(Operations.getAuthState);
  try {
    // fetch all bookmarks
    const response = yield call(Operations.getProfileBookmarks, user._id);
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
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}
