import { API } from '../../config';

export const fetchInitialRecipes = async () => {
  try {
    const res = await fetch(`${API}/recipes/list`, {
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

export const getListState = state => state.List;
