import * as Types from './types';

export const signup = formData => ({
  type: Types.SIGNUP,
  payload: formData
});

export const activate = token => ({
  type: Types.ACTIVATE,
  payload: token
});

export const signin = formData => ({
  type: Types.SIGNIN,
  payload: formData
});

export const cleanUp = () => ({
  type: Types.CLEAN
});
