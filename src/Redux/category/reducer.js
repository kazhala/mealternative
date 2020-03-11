/*
  category reducer
*/
import * as Types from './types';

const initialState = {
  loading: false,
  loadMoreLoading: false,
  error: '',
  recipes: [],
  category: {},
  page: 1,
  totalPages: 1,
  sortOption: '-likes',
  size: 10,
  hasNextPage: true
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CATEGORY_BEGIN:
      return { ...state, hasNextPage: true, loading: true, error: '' };
    case Types.CATEGOR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loadMoreLoading: false
      };
    case Types.CATEGORY_CLEAN:
      return {
        ...state,
        loading: false,
        loadMoreLoading: false,
        error: '',
        recipes: [],
        category: {},
        page: 1,
        sortOption: '-rating'
      };
    case Types.CATEGORY_STORE_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        recipes: [...action.payload.recipes],
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        category: action.payload.category,
        size: action.payload.size
      };
    case Types.CATEGORY_LOADMORE_LOADING:
      return { ...state, loadMoreLoading: true, error: '' };
    case Types.CATEGORY_LOADMORE_SUCCESS:
      return {
        ...state,
        error: '',
        loadMoreLoading: false,
        page: action.payload.page,
        recipes: [...state.recipes, ...action.payload.recipes],
        size: action.payload.size
      };
    case Types.CATEGORY_CLEAR_ERROR:
      return { ...state, error: '', loading: false, loadMoreLoading: false };
    case Types.CATEGORY_SORT_RESET:
      return { ...state, sortOption: '-rating' };
    case Types.CATEGORY_SORT:
      return { ...state, sortOption: action.payload };
    case Types.CATEGORY_END:
      return { ...state, hasNextPage: false };
    default:
      return state;
  }
};

export default CategoryReducer;
