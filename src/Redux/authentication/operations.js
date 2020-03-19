/*
  Async api calls for sagas
*/
import { API } from '../../config';
import Cookies from 'js-cookie';

// sign up
export const signUp = async payload => {
  try {
    const res = await fetch(`${API}/pre-signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// activate account
export const activate = async payload => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: payload })
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// forgot password
export const forgotPassword = async payload => {
  try {
    const res = await fetch(`${API}/forgot-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: payload })
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// reset password
export const resetPassword = async payload => {
  try {
    const res = await fetch(`${API}/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// signin
export const signIn = async payload => {
  console.log(payload);
  const bodyData =
    payload.email || payload.password
      ? JSON.stringify(payload)
      : JSON.stringify({ token: payload });
  try {
    const res = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// store user infor
export const authenticate = data => {
  if (navigator.cookieEnabled) {
    Cookies.set('token', data.token, { expires: 7 });
    if (window.localStorage) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error("Your browser doesn't support storage, can't login");
    }
  } else {
    throw new Error("Your browser doesn't support cookie, can't login");
  }
};

// check if the user is authenticated
export const checkAuthentication = () => {
  try {
    const userToken = Cookies.get('token');
    if (userToken) {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? true : false;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// get the user
export const getUserInfo = () => {
  try {
    const userToken = Cookies.get('token');
    if (userToken) {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? userData : {};
    } else {
      return {};
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

// handle user logout
export const signOut = () => {
  try {
    Cookies.remove('token');
    localStorage.removeItem('user');
  } catch (err) {
    console.log(err);
  }
};
