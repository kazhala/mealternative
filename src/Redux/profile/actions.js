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

export const getProfileBookmarks = () => {
  return {
    type: Types.PROFILE_GET_BOOKMARKS
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
