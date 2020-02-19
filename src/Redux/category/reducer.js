/*
  category reducer
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipes: [],
  category: '',
  page: 1
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CATEGORY_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.CATEGOR_ERROR:
      return { ...state, loading: false, error: action.payload };
    case Types.CATEGORY_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        recipes: [],
        category: '',
        page: 1
      };
    case Types.CATEGORY_STORE_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        recipes: [...action.payload.recipes],
        page: action.payload.page,
        category: action.payload.category
      };
    case Types.CATEGORY_CLEAR_ERROR:
      return { ...state, error: '', loading: false };
    default:
      return state;
  }
};

export default CategoryReducer;
