/*
  Recipe detail actions
*/
import * as Types from './types';

export const fetchRecipeDetails = payload => {
  return {
    type: Types.FETCH_RECIPE_DETAIL,
    payload
  };
};
