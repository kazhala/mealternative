import { API } from '../../config';

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
