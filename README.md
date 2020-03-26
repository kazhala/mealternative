# Mealternative

A fully responsive MERN stack web app for finding nearby restaurants as well as a platform for finding and sharing recipes.

Project URL: https://mealternative.com/

- Find restaurants using [google-map-react](https://github.com/google-map-react/google-map-react)
- Styled with [MaterialUi](https://material-ui.com/)
- State managed by [Redux](https://redux.js.org/introduction/getting-started/) and [Redux-Saga](https://redux-saga.js.org/)
- For backend related information you could find it in backend [repo](https://github.com/kazhala/mealternative-backend)

## Introduction

This project was bootstrapped with [CRA](https://github.com/facebook/create-react-app). It's not built for production usage, I've built this website mainly to refresh my knowledge on the MERN stack as well as finding some restaurants from time to time. I hope you could steal and find something useful from this repo and website. I also do share some random Chinese recipes on it :)

Big credits to this blog [post](https://medium.com/javascript-in-plain-english/building-a-react-ice-cream-finder-app-with-the-google-maps-api-7e39339e0261) which helps me understand how to use the google map API.

## Usage

To play around the app locally, please follow the steps below

1. Clone the repository
2. Go into the directory where the package.json resides
3. Install dependencies

```
npm install
```

4. Create the required .env file with below three variables inside it.
   Note: at the minimum, you will need to create your own google map api key (detailed steps and explanations are [here](https://github.com/kazhala/mealternative#setup)).

```
cat << EOF > .env
REACT_APP_GOOGLE_MAP_API_KEY=<Your api key>
REACT_APP_BACKEND_URL=https://api.mealternative.com
REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/kazhala/image/upload
EOF
```

     If you also followed the backend set up, you could change the `REACT_APP_BACKEND_URL` to

```
REACT_APP_BACKEND_URL=http://localhost:8000/api
```
