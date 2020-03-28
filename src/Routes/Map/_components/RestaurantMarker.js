/*
  The restaurant marker that presents the restaurant on the map
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import ComboRating from '../../../Common/ComboRating/ComboRating';
import { PinDrop } from '@material-ui/icons';
import { Typography, Box } from '@material-ui/core';

const RestaurantMarker = (props) => {
  // $hover props determine if the marker is hovered
  const {
    classes,
    $hover,
    restaurant,
    getBasicResDetails,
    getDetailedResDetail,
    checkSelectedMarker,
  } = props;

  const {
    name,
    rating,
    price_level,
    distance,
    totalRatings,
  } = getBasicResDetails(restaurant);

  return (
    <div onClick={() => getDetailedResDetail(restaurant)}>
      <div className={classes.centerMarker}>
        {checkSelectedMarker(restaurant.place_id) ? (
          <PinDrop color='primary' fontSize='large' />
        ) : (
          <PinDrop color='secondary' fontSize='small' />
        )}
      </div>
      {($hover || checkSelectedMarker(restaurant.place_id)) && (
        <Typography
          className={classes.markerDetail}
          component='div'
          variant='caption'
        >
          <Box className={classes.markerName} fontSize='1.3em'>
            {name}
          </Box>
          <ComboRating rating={rating} price={price_level} />
          <Box className={classes.markerPrice}>
            {totalRatings} ratings {(distance / 1000).toFixed(2)}km away
          </Box>
        </Typography>
      )}
    </div>
  );
};

RestaurantMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  $hover: PropTypes.any,
  restaurant: PropTypes.object.isRequired,
  getBasicResDetails: PropTypes.func.isRequired,
  getDetailedResDetail: PropTypes.func.isRequired,
  checkSelectedMarker: PropTypes.func.isRequired,
};

export default RestaurantMarker;
