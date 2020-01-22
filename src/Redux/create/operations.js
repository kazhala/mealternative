import { API } from '../../config';

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
