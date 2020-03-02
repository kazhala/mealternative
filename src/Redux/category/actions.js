/*
  category action dispatch
*/
import * as Types from './types';

export const getCategoryRecipes = (id, size) => {
  return {
    type: Types.CATEGORY_GET_RECIPES,
    payload: { id, size }
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

export const loadMore = () => {
  return {
    type: Types.CATEGORY_LOADMORE
  };
};

export const sortRecipes = payload => {
  return {
    type: Types.CATEGORY_SORT,
    payload
  };
};

export const resetSort = () => {
  return {
    type: Types.CATEGORY_SORT_RESET
  };
};
