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
