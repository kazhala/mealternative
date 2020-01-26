import { API, CloudinaryURL } from '../../config';

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

export const uploadStepImage = async file => {
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
