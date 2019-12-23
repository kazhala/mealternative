/*
  The restaurant marker that presents the restaurant on the map
*/
import React from 'react';
import PropTypes from 'prop-types';
import { PinDrop } from '@material-ui/icons';
import { Typography, Box } from '@material-ui/core';

const RestaurantMarker = props => {
  // $hover props determine if the marker is hovered
  const { classes, $hover, restaurant } = props;

  return (
    <div>
      <div className={classes.centerMarker}>
        <PinDrop color='primary' fontSize='small' />
      </div>
      {$hover && (
        <Typography
          className={classes.markerDetail}
          component='div'
          variant='caption'
        >
          <Box>{restaurant.name}</Box>
          <Box>Rating: {restaurant.rating}</Box>
          {restaurant.price_level && (
            <Box>Price-level: {restaurant.price_level}</Box>
          )}
          {restaurant.opening_hours && (
            <Box>Open: {restaurant.opening_hours.isOpen() ? 'Yes' : 'No'}</Box>
          )}
        </Typography>
      )}
    </div>
  );
};

RestaurantMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  $hover: PropTypes.any,
  restaurant: PropTypes.object.isRequired
};

export default RestaurantMarker;
