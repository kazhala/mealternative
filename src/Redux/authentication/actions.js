import * as Types from './types';

export const signup = formData => ({
  type: Types.SIGNUP,
  payload: formData
});

export const activate = token => ({
  type: Types.ACTIVATE,
  payload: token
});
