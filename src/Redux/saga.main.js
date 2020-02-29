/*
  Combines all the Sagas into one Saga
*/

import { all, fork } from 'redux-saga/effects';
import { AuthSagas } from './authentication';
import { CreateSagas } from './create';
import { ListSagas } from './list';
import { RecipeSagas } from './recipe';
import { ProfileSagas } from './profile';
import { UpdateSagas } from './update';
import { CategorySagas } from './category';
import { HomeSagas } from './home';

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
      fork(ListSagas.watchSearchRecipes),
      fork(RecipeSagas.watchFetchRecipeDetails),
      fork(RecipeSagas.watchIncrementLike),
      fork(RecipeSagas.watchIncrementBook),
      fork(RecipeSagas.watchRateRecipe),
      fork(ProfileSagas.watchProfileGetUser),
      fork(ProfileSagas.watchProfileUpdateUser),
      fork(ProfileSagas.watchProfileGetBookmarks),
      fork(ProfileSagas.watchProfileGetRecipes),
      fork(ProfileSagas.watchRemoveRecipe),
      fork(ProfileSagas.watchUpdatePassword),
      fork(ProfileSagas.watchLoadMoreRecipes),
      fork(ProfileSagas.watchLoadMoreBookmarks),
      fork(UpdateSagas.watchGetRecipeDetails),
      fork(UpdateSagas.watchUpdateRecipe),
      fork(CategorySagas.watchGetCategoryRecipes),
      fork(CategorySagas.watchLoadMoreRecipes),
      fork(HomeSagas.watchGetCategories)
    ]);
  } catch (err) {
    console.log(err);
  }
}
