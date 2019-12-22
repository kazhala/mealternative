/*
  The restaurant marker that presents the restaurant on the map
*/
import React from 'react';
import PropTypes from 'prop-types';
import { PinDrop } from '@material-ui/icons';

const RestaurantMarker = props => {
  // $hover props determine if the marker is hovered
  const { classes, $hover } = props;

  return (
    <div className={classes.centerMarker}>
      <PinDrop color='primary' fontSize='large' />
    </div>
  );
};

RestaurantMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  $hover: PropTypes.any
};

export default RestaurantMarker;
