/*
  The restaurant marker that presents the restaurant on the map
*/
import React from 'react';
import PropTypes from 'prop-types';
import { PinDrop } from '@material-ui/icons';
import { Typography, Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const RestaurantMarker = props => {
  // $hover props determine if the marker is hovered
  const {
    classes,
    $hover,
    restaurant,
    getBasicResDetails,
    getDetailedResDetail
  } = props;

  const {
    name,
    rating,
    price_level,
    distance,
    totalRatings
  } = getBasicResDetails(restaurant);

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
          onClick={() => getDetailedResDetail(restaurant)}
        >
          <Box className={classes.markerName} fontSize='1.3em'>
            {name}
          </Box>
          <Box className={classes.markerRatingRoot}>
            ({rating})
            <Rating
              className={classes.markerRatingStar}
              name='restaurant rating'
              value={rating}
              precision={0.1}
              readOnly
            />
            ({price_level})
          </Box>
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
  getDetailedResDetail: PropTypes.func.isRequired
};

export default RestaurantMarker;
