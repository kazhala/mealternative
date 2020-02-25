/*
  Profile api calls
*/
import { API, CloudinaryURL } from '../../config';
import Cookies from 'js-cookie';

export const getProfileState = state => state.Profile;

export const updatePassword = async (oldPassword, newPassword) => {
  try {
    const res = await fetch(`${API}/user/:userId/password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const getProfileBookmarks = async (userId, page) => {
  try {
    const res = await fetch(`${API}/user/${userId}/bookmarks?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const getProfileDetails = async userId => {
  try {
    const res = await fetch(`${API}/user/${userId}/details`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

// upload to cloudinary
export const uploadProfileImage = async file => {
  try {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mealternative_profile');
    data.append('cloud_name', 'kazhala');
    const res = await fetch(CloudinaryURL, {
      method: 'POST',
      body: data
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const updateProfileDetails = async params => {
  try {
    const res = await fetch(`${API}/user/${params._id}/details`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(params)
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const validateName = async (userId, username) => {
  try {
    const res = await fetch(`${API}/user/check/${userId}/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const getProfileRecipes = async (userId, page) => {
  try {
    const res = await fetch(`${API}/user/${userId}/recipes?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const removeRecipe = async recipeId => {
  try {
    const res = await fetch(`${API}/recipe/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};
