/*
  create reducer
*/
import * as Types from './types';

const initialState = {
  categories: [],
  categoryLoading: false,
  error: ''
};

const CreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BEGIN_CATEGORIES:
      return { ...state, categoryLoading: true };
    case Types.SUCCESS_CATEGORIES:
      return { ...state, categoryLoading: false, categories: action.payload };
    case Types.ERROR:
      return { ...state, error: action.payload };
    case Types.CLEAN:
      return { ...state, categoryLoading: false, error: '' };
    default:
      return state;
  }
};

export default CreateReducer;