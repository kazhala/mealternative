/*
  list actions
*/
import * as Types from './types';

export const fetch_initial_recipes = () => {
  return {
    type: Types.FETCH_INITIAL_RECIPES
  };
};

export const cleanUp = () => {
  return {
    type: Types.LIST_CLEAN
  };
};
