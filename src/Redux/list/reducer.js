/*
  List reducer for handling list stuff
*/
import * as Types from './types';

const initialState = {
  loading: false,
  error: '',
  initialPage: 1,
  recipeList: [],
  recipePage: 1,
  totalPages: 1,
  size: 10,
  listCycle: false,
  recipeSortOption: '',
  loadMoreLoading: false,
  sorted: false,
  search: '',
  hasNextPage: true
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
    case Types.LIST_CLEAR_ERROR:
      return { ...state, loading: false, error: '' };
    case Types.LIST_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        initialPage: 1,
        recipeList: [],
        recipePage: 1,
        totalPages: 1,
        listCycle: false,
        recipeSortOption: '',
        loadMoreLoading: false,
        sorted: false,
        search: ''
      };
    case Types.LIST_BEGIN:
      return { ...state, loading: true, error: '', hasNextPage: true };
    case Types.NEXT_LIST_CYCLE:
      return { ...state, listCycle: true };
    case Types.SUCESS_INITIAL_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        search: '',
        initialPage: action.payload.page,
        totalPages: action.payload.totalPages,
        recipeList: [...action.payload.response],
        recipePage: action.payload.page,
        recipeSortOption: action.payload.sortOption,
        size: action.payload.size
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
    case Types.SORT_BEGIN:
      return { ...state, hasNextPage: true, loading: true, sorted: true };
    case Types.SUCCESS_SORT_RECIPES:
      return {
        ...state,
        loading: false,
        error: '',
        initialPage: 1,
        totalPages: action.payload.totalPages,
        recipeList: [...action.payload.response],
        recipePage: action.payload.page,
        recipeSortOption: action.payload.sortOption
      };
    case Types.SEARCH_BEGIN:
      return {
        ...state,
        hasNextPage: true,
        loading: true,
        search: action.payload
      };
    case Types.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        initialPage: action.payload.page,
        recipePage: action.payload.page,
        totalPages: action.payload.totalPages,
        recipeList: [...action.payload.response],
        recipeSortOption: action.payload.sortOption,
        sorted: true,
        size: action.payload.size
      };
    case Types.LIST_END:
      return { ...state, hasNextPage: false };
    default:
      return state;
  }
};

export default ListReducer;
