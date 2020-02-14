/*
  update reducer
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  loadingText: '',
  recipeDetails: {}
};

const UpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.UPDATE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case Types.UPDATE_LOADING_TEXT:
      return { ...state, loading: action.payload };
    case Types.UPDATE_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        loadingText: ''
      };
    case Types.UPDATE_STORE_RECIPE:
      return { ...state, loading: false, recipeDetails: action.payload };
    default:
      return state;
  }
};

export default UpdateReducer;
