/*
  actions dispatch for update redux
*/
import * as Types from './types';

export const getRecipeDetails = payload => {
  return {
    type: Types.UPDATE_GET_RECIPE,
    payload
  };
};

export const cleanUp = () => {
  return {
    type: Types.UPDATE_CLEAN
  };
};

export const clearUpdate = () => {
  return {
    type: Types.UPDATE_CLEAR
  };
};

export const updateRecipe = (recipeDetail, selCategoryIds, recipeId) => {
  return {
    type: Types.UPDATE_RECIPE,
    payload: {
      recipeDetail,
      selCategoryIds,
      recipeId
    }
  };
};
