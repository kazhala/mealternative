import React from 'react';
import PropTypes from 'prop-types';

const LocationFilterForm = props => {
  const { classes, handleRestaurantSearch } = props;

  return <button onClick={handleRestaurantSearch}>Hello</button>;
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default LocationFilterForm;
