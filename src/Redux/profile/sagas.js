import { takeLatest, put, call, delay } from 'redux-saga/effects';
import * as Types from './types';
import * as Operations from './operations';

export function* watchProfileGetUser() {
  yield takeLatest(Types.PROFILE_GET_USER, workerProfileGetUser);
}

export function* watchProfileUpdateUser() {
  yield takeLatest(Types.PROFILE_UPDATE_USER, workerProfileUpdateUser);
}

function* workerProfileGetUser({ payload }) {
  yield put({ type: Types.DETAIL_BEGIN });
  try {
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

function* workerProfileUpdateUser({ payload }) {
  yield put({ type: Types.PROFILE_BEGIN });
  const uploadParams = { ...payload };
  try {
    let response = yield call(
      Operations.validateName,
      uploadParams._id,
      uploadParams.username
    );
    if (response.error) {
      throw new Error('username already exists');
    }
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
    uploadParams.newImageFile = undefined;
    yield put({ type: Types.PROFILE_LOADING_TEXT, payload: 'Updating..' });
    response = yield call(Operations.updateProfileDetails, uploadParams);
    if (response.error) {
      throw new Error(response.error);
    }
    yield delay(1000);
    yield put({ type: Types.PROFILE_STORE_USER, payload: response });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: Types.PROFILE_ERROR, payload: err.message });
  }
}
