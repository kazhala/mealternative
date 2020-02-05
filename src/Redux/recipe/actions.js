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

export const cleanUp = () => {
  return {
    type: Types.RECIPE_CLEAR
  };
};

export const incrementLike = () => {
  return {
    type: Types.RECIPE_LIKE
  };
};

export const incrementBook = () => {
  return {
    type: Types.RECIPE_BOOK
  };
};

export const updateRecipeRating = payload => {
  return {
    type: Types.RECIPE_RATE,
    payload
  };
};
