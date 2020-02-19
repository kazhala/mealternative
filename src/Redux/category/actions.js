/*
  category action dispatch
*/
import * as Types from './types';

export const getCategoryRecipes = payload => {
  return {
    type: Types.CATEGORY_GET_RECIPES,
    payload
  };
};

export const cleanUp = () => {
  return {
    type: Types.CATEGORY_CLEAN
  };
};

export const clearError = () => {
  return {
    type: Types.CATEGORY_CLEAR_ERROR
  };
};
