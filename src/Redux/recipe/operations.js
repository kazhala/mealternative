/*
  detail recipe operations
*/
import { API } from '../../config';

export const fetchRecipeDetails = async recipeId => {
  try {
    const res = await fetch(`${API}/recipe/${recipeId}`, {
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
