/*
  helper functions for sagas
*/
import { API } from '../../config';

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return res.json();
  } catch (err) {
    console.log('Error', err);
  }
};
