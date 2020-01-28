/*
  List reducer for handling list stuff
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  recipeList: [],
  recipePage: 1,
  recipeSortOption: '',
  hasNextPage: false,
  loadMoreLoading: false
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loadMoreLoading: false
      };
    case Types.LIST_CLEAN:
      return { ...state, loading: false, error: '', loadMoreLoading: false };
    case Types.LIST_BEGIN:
      return { ...state, loading: true };
    case Types.SET_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload };
    case Types.SUCESS_INITIAL_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        recipeList: [...action.payload.response],
        recipePage: action.payload.page,
        recipeSortOption: action.payload.sortOption
      };
    case Types.LOAD_MORE_BEGIN:
      return { ...state, loadMoreLoading: true };
    case Types.LOAD_MORE_SUCCESS:
      return {
        ...state,
        loadMoreLoading: false,
        error: '',
        recipeList: [...state.recipeList, ...action.payload.response],
        recipePage: action.payload.page,
        recipeSortOption: action.payload.sortOption
      };
    default:
      return state;
  }
};

export default ListReducer;
