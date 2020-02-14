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