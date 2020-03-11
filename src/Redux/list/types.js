/*
  action types for list operations
*/

// general
export const LIST_BEGIN = 'LIST_BEGIN';
export const LIST_ERROR = 'LIST_ERROR';
export const LIST_CLEAN = 'LIST_CLEAN';
export const LIST_CLEAR_ERROR = 'LIST_CLEAR_ERROR';
export const LIST_END = 'LIST_END';

// initial fetch
export const FETCH_INITIAL_RECIPES = 'FETCH_INITIAL_RECIPES';
export const SUCESS_INITIAL_RECIPES = 'SUCESS_INITIAL_RECIPES';

// load more
export const LOAD_MORE_RECIPES = 'LOAD_MORE_RECIPES';
export const LOAD_MORE_BEGIN = 'LOAD_MORE_LOADING';
export const LOAD_MORE_SUCCESS = 'LOAD_MORE_SUCCESS';

// cycle
export const NEXT_LIST_CYCLE = 'NEXT_LIST_CYCLE';

// sorting
export const FETCH_SORT_RECIPES = 'FETCH_SORT_RECIPES';
export const SUCCESS_SORT_RECIPES = 'SUCCESS_SORT_RECIPES';
export const SORT_BEGIN = 'SORT_BEGIN';

// search
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
