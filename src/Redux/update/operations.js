/*
  operations to support update sagas
*/
import { API } from '../../config';
import Cookies from 'js-cookie';

export const getRecipeDetails = async recipeId => {
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
    console.log('Error', err);
  }
};

export const updateRecipe = async updateParams => {
  try {
    const res = await fetch(`${API}/recipe/${updateParams.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(updateParams)
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};
