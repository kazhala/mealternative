/*
  category saga helpers
*/
import { API } from '../../config';

export const getCategoryRecipes = async id => {
  try {
    const res = await fetch(`${API}/recipes/category?id=${id}`, {
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
