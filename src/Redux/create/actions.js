/*
  create reducer actions
*/
import * as Types from './types';

export const fetchCategories = () => {
  return {
    type: Types.BEGIN_CATEGORIES
  };
};
