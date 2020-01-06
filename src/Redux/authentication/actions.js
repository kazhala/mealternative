import * as Types from './types';

export const signup = formData => ({
  type: Types.SIGNUP,
  payload: formData
});
