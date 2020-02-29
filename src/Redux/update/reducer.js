/*
  update reducer
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  loadingText: '',
  recipeDetails: {},
  success: false,
  initLoading: false
};

const UpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_BEGIN:
      return { ...state, loading: true, error: '', initLoading: false };
    case Types.UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        initLoading: false
      };
    case Types.UPDATE_LOADING_TEXT:
      return { ...state, loadingText: action.payload };
    case Types.UPDATE_CLEAR:
      return {
        ...state,
        loading: false,
        error: '',
        loadingText: '',
        success: false,
        initLoading: false
      };
    case Types.UPDATE_STORE_RECIPE:
      return {
        ...state,
        loading: false,
        recipeDetails: action.payload,
        initLoading: false
      };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, initLoading: false };
    case Types.UPDATE_INIT:
      return { ...state, initLoading: true, error: '', loading: false };
    case Types.UPDATE_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        loadingText: '',
        recipeDetails: {},
        success: false,
        initLoading: false
      };
    default:
      return state;
  }
};

export default UpdateReducer;
