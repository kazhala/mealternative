/*
  Combines all the Sagas into one Saga
*/

import { all, fork } from 'redux-saga/effects';
import { AuthSagas } from './authentication';
import { CreateSagas } from './create';
import { ListSagas } from './list';
import { RecipeSagas } from './recipe';
import { ProfileSagas } from './profile';

// running all sagas parallel(all) without blocking(fork)
export default function* rootSaga() {
  try {
    yield all([
      fork(AuthSagas.watchSignUp),
      fork(AuthSagas.watchActivate),
      fork(AuthSagas.watchSignIn),
      fork(AuthSagas.watchSignOut),
      fork(AuthSagas.watchForgot),
      fork(AuthSagas.watchReset),
      fork(CreateSagas.watchGetCategories),
      fork(CreateSagas.watchSubmitRecipe),
      fork(ListSagas.watchFetchInitRecipes),
      fork(ListSagas.watchLoadMoreRecipes),
      fork(ListSagas.watchSortRecipes),
      fork(RecipeSagas.watchFetchRecipeDetails),
      fork(RecipeSagas.watchIncrementLike),
      fork(RecipeSagas.watchIncrementBook),
      fork(RecipeSagas.watchRateRecipe),
      fork(ProfileSagas.watchProfileGetUser),
      fork(ProfileSagas.watchProfileUpdateUser),
      fork(ProfileSagas.watchProfileGetBookmarks),
      fork(ProfileSagas.watchProfileGetRecipes),
      fork(ProfileSagas.watchRemoveRecipe)
    ]);
  } catch (err) {
    console.log(err);
  }
}
