/*
  Environment Variable export
*/
export const GoogleMapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
export const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_BACKEND_URL
    : 'https://api.mealternative.com/api';
export const CloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;
