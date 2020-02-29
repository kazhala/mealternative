/*
  create reducer
*/
import * as Types from './types';

const initialState = {
  categories: [],
  categoryLoading: false,
  error: '',
  loading: false,
  loadingText: '',
  success: ''
};

const CreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BEGIN_CATEGORIES:
      return { ...state, categoryLoading: true };
    case Types.SUCCESS_CATEGORIES:
      return { ...state, categoryLoading: false, categories: action.payload };
    case Types.CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        categoryLoading: false,
        loadingText: ''
      };
    case Types.CREATE_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        categoryLoading: false,
        loadingText: '',
        success: action.payload
      };
    case Types.CREATE_CLEAN:
      return {
        ...state,
        categoryLoading: false,
        error: '',
        loading: false,
        loadingText: '',
        success: ''
      };
    case Types.CREATE_BEGIN:
      return { ...state, loading: true };
    case Types.CREATE_LOADING_TEXT:
      return { ...state, loadingText: action.payload };
    default:
      return state;
  }
};

export default CreateReducer;
