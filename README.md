# Mealternative

A fully responsive MERN stack web app for finding nearby restaurants as well as a platform for finding and sharing recipes.

Project URL: https://mealternative.com/

- Find restaurants using [google-map-react](https://github.com/google-map-react/google-map-react)
- Styled with [MaterialUi](https://material-ui.com/)
- State managed by [Redux](https://redux.js.org/introduction/getting-started/) and [Redux-Saga](https://redux-saga.js.org/)
- For backend related information you could find it in backend [repo](https://github.com/kazhala/mealternative-backend)

![](https://user-images.githubusercontent.com/43941510/77802302-aca09380-70ce-11ea-8877-fe0fde5d0a22.png)

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

5. Start the server

```
npm start
```

6. Break Everything:)

## Structure

![](https://user-images.githubusercontent.com/43941510/77801667-672f9680-70cd-11ea-9921-5ecb0eaf089f.png)

> The folder structure follows the same folder structure we were using at my intern. It's not the best but there are some positives.

### App

All the HOC components all handled in [index.js](https://github.com/kazhala/mealternative/blob/master/src/index.js) while the [app.js](https://github.com/kazhala/mealternative/blob/master/src/App/App.js) is mainly used for handling react-router switch and the root layout(mobile sidebar, app bar etc).

### Common

Common components shared between routes. [PageSpinner.js](https://github.com/kazhala/mealternative/blob/master/src/Common/Spinner/PageSpinner.js), modal, [SnackBar](https://github.com/kazhala/mealternative/blob/master/src/Common/InfoModal/SuccessSnack.js) etc.

### Hooks

Custom hooks folder. [useInfiniteLoad.js](https://github.com/kazhala/mealternative/blob/master/src/Hooks/useInfiniteLoad.js), [useScreenSize](https://github.com/kazhala/mealternative/blob/master/src/Hooks/useScreenSize.js) etc.

### Redux

![](https://user-images.githubusercontent.com/43941510/77802995-3b61e000-70d0-11ea-9245-cbd16fdac9ad.png)

- store.js (the standard store.js that creates a redux store)
- reducer.main.js and saga.main.js (the root of saga and reducers)
- Individual reducers
  - action.js (action creators)
  - index.js (export purpose only)
  - operation.js (saga helper functions, async calls to backend)
  - reducer.js
  - sagas.js (saga listener and saga worker)
  - types.js (action type, eliminate typo erros)

### Routes

![](https://user-images.githubusercontent.com/43941510/77803602-9ea04200-70d1-11ea-90a1-5b57c61a2e3a.png)

- Routes.js (export purpose only)
- Individual routes
  - Container (Redux connection and most of the logic are handled in the container)
  - Style.js (MaterialUi useStyle hook)
  - Root component (No logic, view only, handles the root layout and style for the route)
  - \_components (sub-components of the route, some of it main contains local logic only related to the component itself)

## Deployment and Hosting

### Frontend

The frontend of this project is hosted on an AWS s3 bucket and distributed through CloudFront. [Here](https://github.com/kazhala/AWSCloudFormationStacks/blob/master/Hosting_frontend_S3.yaml) is the custom frontend deployment template.

### Backend

The backend of this project is hosted on AWS ec2 instance through elastic beanstalk and distributed through CloudFront. [Here](https://github.com/kazhala/AWSCloudFormationStacks/blob/master/Hosting_backend_nodejs.yaml) is the custom backend deployment template.

### Using the template

1. Register a domain through AWS Route53 or create a hosted zone in Route53 and import the domain
2. Register an SSL certificate in us-east-1 region(Cloudfront requirement)
3. Create the Cloudformation stack using the frontend template and enter your registered domain as the bucket name and your SSL certificate Arn
4. After the stack is created, the frontend should be live.
5. Backend template usage is [here](https://github.com/kazhala/mealternative-backend)
