# Mealternative

A fully responsive MERN stack web app for finding nearby restaurants as well as a platform for finding and sharing recipes.

Project URL: https://mealternative.com/

- Find restaurants using [google-map-react](https://github.com/google-map-react/google-map-react)
- Styled with [MaterialUi](https://material-ui.com/)
- State managed by [Redux](https://redux.js.org/introduction/getting-started/) and [Redux-Saga](https://redux-saga.js.org/)
- For backend related information you could find it in backend [repo](https://github.com/kazhala/mealternative-backend)

![](https://user-images.githubusercontent.com/43941510/77802302-aca09380-70ce-11ea-8877-fe0fde5d0a22.png)

## Introduction

This project was bootstrapped with [CRA](https://github.com/facebook/create-react-app). It's not built for production usage, I've built this website mainly to refresh my knowledge on the MERN stack as well as finding some restaurants from time to time. I hope you could steal and find something useful from this repo and website.

Big credits to this blog [post](https://medium.com/javascript-in-plain-english/building-a-react-ice-cream-finder-app-with-the-google-maps-api-7e39339e0261) which helps me understand how to use the google map API.

## Usage

To play around the app locally, please follow the steps below

1. Clone the repository
2. Go into the directory where the package.json resides
3. Install dependencies

```bash
npm install
```

4. Create the required .env file with below three variables inside it.
   Note: at the minimum, you will need to create your own google map api key (detailed steps and explanations are [here](#google-map)).

```bash
cat << EOF > .env
REACT_APP_GOOGLE_MAP_API_KEY=<Your api key>
REACT_APP_BACKEND_URL=https://api.mealternative.com
REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/kazhala/image/upload
EOF
```

If you also followed the backend set up, you could change the `REACT_APP_BACKEND_URL` to

```bash
REACT_APP_BACKEND_URL=http://localhost:8000/api
```

5. Start the server

```bash
npm start
```

6. Break Everything:)

## Google Map

> You will get \$400 free credit for one year when you first create a google cloud account

### Steps to set up Google Map Token

1. Go to google app engine and create a new project. (Alternatively, you could use an existing one if you wish)
2. Go to the google map service
   ![](https://user-images.githubusercontent.com/43941510/77834703-a4ae2580-719a-11ea-9ee8-8d199698cb91.png)
3. Enable 4 APIs. (Places, Map Javascript, Geocoding and Directions API)
   ![](https://user-images.githubusercontent.com/43941510/77834791-5ea59180-719b-11ea-932e-3844ac34a966.png)
4. Navigate to the API & Service console (Credentials tab)
   ![](https://user-images.githubusercontent.com/43941510/77834996-4cc4ee00-719d-11ea-92e1-60a91dff2fbe.png)
5. At the top, click + Create Credentials and then click the API key
6. Copy the api key and navigate back to the Google map service page
7. Make sure all of the services are using the same API key (They should pick up the API key automatically). Under Google Map -> APIs
   ![](https://user-images.githubusercontent.com/43941510/77835168-526f0380-719e-11ea-8bae-6ffd7ed9ec9e.png)
8. Done! Now paste the copied API key to .env file mentioned in Usage -> Step4.

### How it works

#### Load the google map

- For center, you could use the browser api to get user current location, this will be the center of your map

```javascript
const [centerMarker, setCenterMarker] = useState({});

useEffect(() => {
  // I stored it in redux, obviously you could create a state and store the lat and lng
  const locationSuccess = (pos) => {
    const crd = pos.coords;
    setCenterMarker({ lat: crd.latitude, lng: crd.longitude });
  };
  const locationError = () =>
    console.log('Please turn on location services in your phone');

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      locationOptions
    );
  } else {
    console.log('Sorry, your browser does not support geolocation');
  }
}, [setCenterMarker]);
```

- GoogleMap component

```javascript
<GoogleMapReact
  bootstrapURLKeys={{
    key: YourGoogleMapAPIKey,
    libraries: ['places', 'directions'],
  }}
  center={{ lat: centerMarker.lat, lng: centerMarker.lng }}
  defaultZoom={16}
  yesIWantToUseGoogleMapApiInternals={true}
  onGoogleApiLoaded={({ map, maps }) => handleMapApiLoaded(map, maps)}
/>
```

- You will need to create a call back for `onGoogleApiLoaded` to init apis

```javascript
const [googleMap, setGoogleMap] = useState({
  mapsApi: null,
  autoCompleteService: null,
  placesServices: null,
  directionService: null,
  geoCoderService: null,
  mapLoaded: false,
});

const handleMapApiLoaded = (map, maps) => {
  setGoogleMap({
    ...googleMap,
    mapsApi: maps,
    autoCompleteService: new maps.places.AutocompleteService(),
    placesServices: new maps.places.PlacesService(map),
    directionService: new maps.DirectionsService(),
    geoCoderService: new maps.Geocoder(),
    mapLoaded: true,
  });
};
```

#### Address auto completion

- Import an autocompletion component from any package, I've used materialUi
- use the autoCompleteService initialised in previouse step

```javascript
const handleAutoCompleteUpdate = (searchValue, callBack) => {
  const searchQuery = {
    input: searchValue,
    location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng), // mapsApi is from the previous step
    radius: 100000, // in Meters. 100km
  };
  // if there is input, perform google autoCompleteService request
  searchQuery.input &&
    autoCompleteService.getQueryPredictions(searchQuery, (response) => {
      // The name of each GoogleMaps place suggestion is in the "description" field
      if (response) {
        const dataSource = response.map((resp) => resp.description);
        // set the autoCompletion's options
        callBack(dataSource);
      }
    });
};

// This is the autocompletion src that will be presented in the dropdown
const [autoSrc, setAutoSrc] = useState([]);

// the onChange handler for the autocompletion component
const handleChange = (e) => {
  handleAutoCompleteUpdate(e.target.value, (dataSource) =>
    setAutoSrc(dataSource)
  );
};
```

- The autocompletion component for reference

```javascript
import { Autocomplete } from '@material-ui/lab';
...
<Autocomplete
  options={autoSrc}
  loading={determineLoading()}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  open={open}
  disableOpenOnFocus
  onChange={handleSelect} // This is the value when user select an item in the dropdown
  renderInput={(params) => (
    <TextField
      {...params}
      label='Location center'
      variant='outlined'
      fullWidth
      placeholder='Add address'
      value={value} // This value is set through handleSelect, not handleChange
      onChange={handleChange} // This is the value when user type in the textfiled, it only updates the autoSrc
      size='small'
      InputLabelProps={{
        shrink: true,
      }}
    />
  )}
/>;
```

- Updating the center location in the map

```javascript
const updateCenterMarker = (address) => {
  // decode the address to latlng
  geoCoderService.geocode({ address }, (response) => {
    if (!response[0]) {
      console.error("Can't find the address");
      setError("Can't find the address");
      // if empty, set to original location
      setCenterMarker({ lat, lng });
      return;
    }
    const { location } = response[0].geometry;
    setCenterMarker({ lat: location.lat(), lng: location.lng() });
  });
};
```

##### Demo

![](../assets/address-demo.gif?raw=true)

#### Finding restaurants

- Basic search using google api

```javascript
const [resultRestaurantList, setResultRestaurantList] = useState([]);

const handleRestaurantSearch = (searchQuery) => {
  // 1. Create places request (if no search query, just search all restaurant)
  // rankBy cannot be used with radius at the same time
  // rankBy and radius doesn't seem to work with textSearch, keep it for future reference
  const placesRequest = {
    location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng), // mapsApi from previous step initialising google map
    type: ['restaurant', 'cafe'],
    query: searchQuery ? searchQuery : 'restaurant',
    // radius: '500',
    // rankBy: mapsApi.places.RankBy.DISTANCE
  };

  // perform textSearch based on query passed in ('chinese', 'thai', etc)
  placesServices.textSearch(
    placesRequest,
    (locationResults, status, paginationInfo) => {
      if (status !== 'OK') {
        console.error('No results found', status);
      } else {
        setResultRestaurantList([...locationResults]);
      }
    }
  );
};
```

- Add pagination to the result
  > By default, google would return 20 results, with extra 2 page pagination up to 60 results

```javascript
const [nextPage, setNextPage] = useState(null);
const [resultRestaurantList, setResultRestaurantList] = useState([]);

const handleRestaurantSearch = (searchQuery) => {
  const placesRequest = {
    location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
    type: ['restaurant', 'cafe'],
    query: searchQuery ? searchQuery : 'restaurant',
  };

  placesServices.textSearch(
    placesRequest,
    (locationResults, status, paginationInfo) => {
      if (status !== 'OK') {
        console.error('No results found', status);
      } else {
        // store nextPage information to state
        setNextPage(paginationInfo);
        // update state results, without clearing the result when paginating
        setResultRestaurantList((prevList) => {
          const newList = [...prevList, ...tempResultList];
          return newList;
        });
      }
    }
  );
};

const getNextPage = () => {
  if (nextPage.hasNextPage) {
    nextPage.nextPage();
  }
};
```

- Add distance restriction to our search and sorting capability
  > radius and rankBy setting doesn't work well with textSearch api, we could implement something our own

```javascript
const [nextPage, setNextPage] = useState(null);
const [resultRestaurantList, setResultRestaurantList] = useState([]);
// format the distance for sorting later
const calculateDistance = (restaurantLocation, centerLocation) => {
  return mapsApi.geometry.spherical.computeDistanceBetween(
    restaurantLocation,
    centerLocation
  );
};

// Note: add the queryRadius to parameter (in km)
const handleRestaurantSearch = (searchQuery, queryRadius) => {
  const placesRequest = {
    location: new mapsApi.LatLng(centerMarker.lat, centerMarker.lng),
    type: ['restaurant', 'cafe'],
    query: searchQuery ? searchQuery : 'restaurant',
  };

  placesServices.textSearch(
    placesRequest,
    (locationResults, status, paginationInfo) => {
      if (status !== 'OK') {
        console.error('No results found', status);
      } else {
        // temp list to keep current result, only update state once
        let tempResultList = [];
        for (let i = 0; i < locationResults.length; i++) {
          // distance check, see if it's in range
          if (
            calculateDistance(
              locationResults[i].geometry.location,
              placesRequest.location
            ) <
            queryRadius * 1000
          ) {
            // add an attribute for sorting
            locationResults[i].distance = calculateDistance(
              locationResults[i].geometry.location,
              placesRequest.location
            );
            tempResultList.push(locationResults[i]);
          }
        }
        setNextPage(paginationInfo);
        setResultRestaurantList((prevList) => {
          const newList = [...prevList, ...tempResultList];
          return newList;
        });
      }
    }
  );
};
```

##### Check out full example [here](https://github.com/kazhala/mealternative/blob/master/src/Routes/Map/MapContainer.js)

> Include sorting, fetch restaurant details and much more

##### Demo

![](../assets/search-demo.gif?raw=true)

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

The frontend of this project is hosted on an AWS s3 bucket and distributed through CloudFront. [Here](https://github.com/kazhala/AWSCloudFormationStacks/blob/master/Hosting_frontend_S3.yaml) is the custom frontend deployment cloudformation template.

### Backend

The backend of this project is hosted on AWS ec2 instance through elastic beanstalk and distributed through CloudFront. [Here](https://github.com/kazhala/AWSCloudFormationStacks/blob/master/Hosting_backend_nodejs.yaml) is the custom backend deployment cloudformation template.

### Using the template

1. Register a domain through AWS Route53 or create a hosted zone in Route53 and import the domain
2. Register an SSL certificate in us-east-1 region(Cloudfront requirement)
3. Create the Cloudformation stack using the frontend template and enter your registered domain as the bucket name and your SSL certificate Arn
4. After the stack is created, the frontend should be live.
5. Backend template usage is [here](https://github.com/kazhala/mealternative-backend)
