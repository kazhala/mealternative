import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocationFilterForm from './LocationFilterForm';

// search auto complete, will refactor to separate file
const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const FilterFormContainer = props => {
  const {
    classes,
    handleRestaurantSearch,
    nextPage,
    setResultRestaurantList,
    resultRestaurantList,
    setDetailOpen
  } = props;

  // value of auto completion
  const [queryValue, setQueryValue] = useState('');
  // radius filter for the search
  const [queryRadius, setQueryRadius] = useState(2);

  // handle auto completion change
  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  // handle autocompletion select
  // textContent contains the new value
  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  // check if the btn should be disabled
  const checkDisable = type => {
    // type 0 is for load more button
    if (type === 0) {
      if (nextPage) {
        return !nextPage.hasNextPage;
      } else {
        return true;
      }
    } else {
      // type 1 is for detail button
      return !(resultRestaurantList.length > 0);
    }
  };

  // update distance length when slider changes
  const handleDistanceLengthChange = (e, newValue) => {
    setQueryRadius(newValue);
  };

  // display slider value to readable form in slider title
  const displayDistanceLength = () => {
    return `${queryRadius}km`;
  };

  return (
    <LocationFilterForm
      classes={classes}
      handleRestaurantSearch={handleRestaurantSearch}
      nextPage={nextPage}
      setResultRestaurantList={setResultRestaurantList}
      setDetailOpen={setDetailOpen}
      handleSelect={handleSelect}
      queryValue={queryValue}
      handleChange={handleChange}
      displayDistanceLength={displayDistanceLength}
      queryRadius={queryRadius}
      handleDistanceLengthChange={handleDistanceLengthChange}
      checkDisable={checkDisable}
      searchOptions={searchOptions}
    />
  );
};

FilterFormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  setResultRestaurantList: PropTypes.func.isRequired,
  resultRestaurantList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDetailOpen: PropTypes.func.isRequired
};

export default FilterFormContainer;
