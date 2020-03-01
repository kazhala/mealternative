/*
  list actions
*/
import * as Types from './types';

export const fetchInitialRecipes = payload => {
  return {
    type: Types.FETCH_INITIAL_RECIPES,
    payload
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

export const searchRecipes = search => {
  return {
    type: Types.SEARCH_RECIPES,
    payload: search
  };
};

export const clearError = () => {
  return {
    type: Types.LIST_CLEAR_ERROR
  };
};
