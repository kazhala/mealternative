/*
  category saga helpers
*/
import { API } from '../../config';

export const getCategoryRecipes = async (id, sortOption, size) => {
  try {
    const res = await fetch(
      `${API}/recipes/category?id=${id}&sort=${sortOption}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};

export const getCategoryState = state => state.Category;

export const loadMoreRecipes = async (id, sortOption, page, size) => {
  try {
    const res = await fetch(
      `${API}/recipes/category?id=${id}&page=${page}&sort=${sortOption}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};
