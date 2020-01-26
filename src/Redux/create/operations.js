/*
  API calls for saga
*/
import { API, CloudinaryURL } from '../../config';
import Cookies from 'js-cookie';

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// upload thumbnail with mealternative_thumb preset
export const uploadRecipeThumb = async file => {
  try {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mealternative_thumb');
    data.append('cloud_name', 'kazhala');
    const res = await fetch(CloudinaryURL, {
      method: 'POST',
      body: data
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// upload thumbnail with mealternative_steps preset
export const uploadStepImage = async file => {
  try {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mealternative_steps');
    data.append('cloud_name', 'kazhala');
    const res = await fetch(CloudinaryURL, {
      method: 'POST',
      body: data
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// call backend to store recipe in db
export const uploadRecipe = async uploadParams => {
  try {
    const res = await fetch(`${API}/recipe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(uploadParams)
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
