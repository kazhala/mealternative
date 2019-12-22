import React from 'react';
import PropTypes from 'prop-types';
import { PinDrop } from '@material-ui/icons';

const RestaurantMarker = props => {
  const { classes, $hover } = props;

  return (
    <div className={classes.centerMarker}>
      <PinDrop color='primary' fontSize='large' />
    </div>
  );
};

RestaurantMarker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RestaurantMarker;
