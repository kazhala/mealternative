import { API } from '../../config';
import Cookies from 'js-cookie';

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

export const authenticate = data => {
  if (navigator.cookieEnabled) {
    Cookies.set('token', data.token);
    if (window.localStorage) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      throw new Error("Your browser doesn't support storage, can't login");
    }
  } else {
    throw new Error("Your browser doesn't support cookie, can't login");
  }
};
