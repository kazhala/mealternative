/*
  Profile reducers
*/
import * as Types from './types';

const initialState = {
  loading: false,
  loadingText: '',
  error: '',
  info: '',
  userDetails: {},
  bookmarks: [],
  recipes: [],
  detailLoading: false,
  bookmarksLoading: false,
  recipesLoading: false
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DETAIL_BEGIN:
      return { ...state, detailLoading: true, error: '', info: '' };
    case Types.PROFILE_BEGIN:
      return { ...state, loading: true, error: '', info: '' };
    case Types.PROFILE_LOADING_TEXT:
      return { ...state, loadingText: action.payload };
    case Types.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        detailLoading: false,
        info: '',
        loadingText: '',
        bookmarksLoading: false,
        recipesLoading: false
      };
    case Types.PROFILE_CLEAN:
      return {
        ...state,
        loading: false,
        error: '',
        info: '',
        userDetails: {},
        bookmarks: [],
        recipes: [],
        detailLoading: false,
        loadingText: '',
        bookmarksLoading: false,
        recipesLoading: false
      };
    case Types.PROFILE_CLEAR:
      return {
        ...state,
        loading: false,
        error: '',
        info: '',
        detailLoading: false,
        loadingText: '',
        bookmarksLoading: false,
        recipesLoading: false
      };
    case Types.PROFILE_STORE_USER:
      return {
        ...state,
        error: '',
        loading: false,
        userDetails: action.payload,
        detailLoading: false,
        loadingText: ''
      };
    case Types.BOOKMARKS_BEGIN:
      return { ...state, error: '', bookmarksLoading: true, info: '' };
    case Types.PROFILE_STORE_BOOKMARKS:
      return {
        ...state,
        bookmarks: [...action.payload],
        bookmarksLoading: false
      };
    case Types.RECIPES_BEGIN:
      return { ...state, error: '', recipesLoading: true, info: '' };
    case Types.PROFILE_STORE_RECIPES:
      return { ...state, recipes: [...action.payload], recipesLoading: false };
    case Types.PROFILE_INFO:
      return { ...state, error: '', info: action.payload };
    default:
      return state;
  }
};

export default ProfileReducer;
