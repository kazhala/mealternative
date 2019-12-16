import React from 'react';
import useStyles from './Style';
import GoogleMapReact from 'google-map-react';

const Map = props => {
  const classes = useStyles();
  return (
    <div className={classes.mapRoot}>
      <div className={classes.googleMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAwuCk6LpnRxN0mmfi8ZIoaEBylPshsUHo' }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
