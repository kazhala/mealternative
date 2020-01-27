/*
  List reducer for handling list stuff
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipeList: [],
  recipeSortOption: ''
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_ERROR:
      return { ...state, error: action.payload };
    case Types.LIST_CLEAN:
      return { ...state, loading: false, error: '' };
    default:
      return state;
  }
};

export default ListReducer;
