import * as Types from './types';

export const getProfileDetails = userId => {
  return {
    type: Types.PROFILE_GET_USER,
    payload: userId
  };
};
