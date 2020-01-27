/*
  List reducer for handling list stuff
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipeList: [],
  recipePage: 1,
  recipeSortOption: ''
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case Types.LIST_CLEAN:
      return { ...state, loading: false, error: '' };
    case Types.LIST_BEGIN:
      return { ...state, loading: true };
    case Types.SUCESS_INITIAL_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        recipeList: action.payload.response,
        recipePage: action.payload.page,
        recipeSortOption: action.payload.sortOption
      };
    default:
      return state;
  }
};

export default ListReducer;
