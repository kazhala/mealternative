/*
  create reducer actions
*/
import * as Types from './types';

export const getCategories = () => {
  return {
    type: Types.GET_CATEGORIES
  };
};

export const cleanUp = () => ({
  type: Types.CREATE_CLEAN
});

export const submitRecipe = (recipeDetail, selCategoryIds) => {
  return {
    type: Types.CREATE_SUBMIT_RECIPE,
    payload: {
      recipeDetail,
      selCategoryIds
    }
  };
};
