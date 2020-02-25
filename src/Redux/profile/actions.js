/*
  profile actions
*/
import * as Types from './types';

export const getProfileDetails = userId => {
  return {
    type: Types.PROFILE_GET_USER,
    payload: userId
  };
};

export const cleanUp = () => {
  return {
    type: Types.PROFILE_CLEAN
  };
};

export const updateProfileDetails = payload => {
  return {
    type: Types.PROFILE_UPDATE_USER,
    payload
  };
};

export const clearError = () => {
  return {
    type: Types.PROFILE_CLEAR
  };
};

export const getProfileBookmarks = payload => {
  return {
    type: Types.PROFILE_GET_BOOKMARKS,
    payload
  };
};

export const getProfileRecipes = userId => {
  return {
    type: Types.PROFILE_GET_RECIPES,
    payload: userId
  };
};

export const removeRecipe = payload => {
  return {
    type: Types.PROFILE_REMOVE_RECIPE,
    payload
  };
};

export const updatePassword = payload => {
  return {
    type: Types.PROFILE_UPDATE_PASSWORD,
    payload
  };
};

export const loadMoreRecipes = userId => {
  return {
    type: Types.PROFILE_LOADMORE_RECIPES,
    payload: userId
  };
};

export const loadMoreBookmarks = userId => {
  return {
    type: Types.PROFILE_LOADMORE_BOOKMARKS,
    payload: userId
  };
};
