/*
  list actions
*/
import * as Types from './types';

export const fetchInitialRecipes = () => {
  return {
    type: Types.FETCH_INITIAL_RECIPES
  };
};

export const cleanUp = () => {
  return {
    type: Types.LIST_CLEAN
  };
};

export const loadMoreRecipes = () => {
  return {
    type: Types.LOAD_MORE_RECIPES
  };
};

export const sortRecipes = sortOption => {
  return {
    type: Types.FETCH_SORT_RECIPES,
    payload: sortOption
  };
};
