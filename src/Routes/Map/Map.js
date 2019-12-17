import React from 'react';
import useStyles from './Style';
import GoogleMapReact from 'google-map-react';
import { GoogleMapAPIKey } from '../../config';

const Map = props => {
  const { lat, lng } = props;
  const classes = useStyles();

  const handleApiLoaded = (map, maps) => {
    console.log('map', map);
    console.log('maps', maps);
  };

  console.log(GoogleMapAPIKey);

  return (
    <div className={classes.mapRoot}>
      <div className={classes.googleMap}>
        {lat && lng ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GoogleMapAPIKey
            }}
            center={{ lat, lng }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          ></GoogleMapReact>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
};

export default Map;
