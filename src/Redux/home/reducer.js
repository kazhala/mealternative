/*
  reducer of the home redux
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  categories: []
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.HOME_BEGIN:
      return { ...state, loading: true, error: '' };
    case Types.HOME_ERROR:
      return { ...state, loading: false, error: action.payload };
    case Types.HOME_STORE_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: [...action.payload],
        error: ''
      };
    case Types.HOME_CLEAN:
      return { ...state, error: '', loading: false };
    default:
      return state;
  }
};

export default HomeReducer;
