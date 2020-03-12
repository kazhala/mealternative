/*
  Profile reducers
*/
import * as Types from './types';

/*
  loading: general page loading
  loadingText: text under the spinner
  error: general page error
  info: genral page success
  detailLoading: tab specific loading
  bookmarksLoading
  recipesLoading
*/
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
  recipesLoading: false,
  recipePage: 1,
  totalRecipePage: 1,
  bookmarkPage: 1,
  totalBookmarkPage: 1,
  hasNextPage: true
};

// PROFILE_CLEAN: clear everything on unmount
// PROFILE_CLEAR: remove all error and loading states
const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DETAIL_BEGIN:
      return { ...state, detailLoading: true, error: '' };
    case Types.PROFILE_BEGIN:
      return { ...state, loading: true, error: '' };
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
        recipesLoading: false,
        recipePage: 1,
        totalRecipePage: 1,
        bookmarkPage: 1,
        totalBookmarkPage: 1
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
      return {
        ...state,
        error: '',
        bookmarksLoading: true,
        hasNextPage: true
      };
    case Types.PROFILE_STORE_BOOKMARKS:
      return {
        ...state,
        bookmarks: [...action.payload.bookmarks],
        bookmarkPage: action.payload.page,
        totalBookmarkPage: action.payload.totalPages,
        bookmarksLoading: false
      };
    case Types.RECIPES_BEGIN:
      return {
        ...state,
        error: '',
        recipesLoading: true,
        hasNextPage: true
      };
    case Types.PROFILE_STORE_RECIPES:
      return {
        ...state,
        recipes: [...action.payload.recipes],
        recipesLoading: false,
        recipePage: action.payload.page,
        totalRecipePage: action.payload.totalPages
      };
    case Types.PROFILE_INFO:
      return { ...state, error: '', info: action.payload };
    case Types.PROFILE_LOADMORE_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload.recipes],
        recipePage: action.payload.page,
        totalRecipePage: action.payload.totalPages
      };
    case Types.PROFILE_LOADMORE_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmarks: [...state.bookmarks, ...action.payload.bookmarks],
        bookmarkPage: action.payload.page,
        totalBookmarkPage: action.payload.totalPages
      };
    case Types.PROFILE_END:
      return { ...state, hasNextPage: false };
    default:
      return state;
  }
};

export default ProfileReducer;
