import React from 'react';
import useStyles from './Style';
import GoogleMapReact from 'google-map-react';

const Map = props => {
  const { lat, lng } = props;
  const classes = useStyles();

  const handleApiLoaded = (map, maps) => {
    console.log('map', map);
    console.log('maps', maps);
  };

  return (
    <div className={classes.mapRoot}>
      <div className={classes.googleMap}>
        {lat && lng ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyAwuCk6LpnRxN0mmfi8ZIoaEBylPshsUHo'
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
