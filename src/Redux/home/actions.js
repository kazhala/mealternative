/*
  redux actions for homepage
*/
import * as Types from './types';

export const getCategories = () => {
  return {
    type: Types.HOME_GET_CATEGORY
  };
};

export const cleanUp = () => {
  return {
    type: Types.HOME_CLEAN
  };
};
