/*
  Action provider for routes
*/
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

export const signOut = () => ({
  type: Types.SIGNOUT
});

export const forgotPassword = email => ({
  type: Types.FORGOTPASSWORD,
  payload: email
});

export const resetPassword = payload => ({
  type: Types.RESETPASSWORD,
  payload
});

export const formError = error => ({
  type: Types.ERROR,
  payload: error
});
