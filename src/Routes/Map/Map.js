import React from 'react';
import useStyles from './Style';
import GoogleMapReact from 'google-map-react';

const Map = props => {
  const classes = useStyles();
  return (
    <div className={classes.mapRoot}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAwuCk6LpnRxN0mmfi8ZIoaEBylPshsUHo' }}
        defaultCenter={{ lat: 59.95, lng: 30.33 }}
        defaultZoom={11}
      >
        <test lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
    </div>
  );
};

const test = ({ text }) => <div>{text}</div>;

export default Map;
