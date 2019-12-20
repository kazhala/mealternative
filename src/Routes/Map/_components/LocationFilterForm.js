/*
  Filter option form for searching restaurant
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { TextField, Button, Typography, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  DirectionsWalk,
  DirectionsCar,
  DirectionsBike
} from '@material-ui/icons';

// search auto complete, will refactor to separate file
const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const LocationFilterForm = props => {
  const { classes, handleRestaurantSearch } = props;

  // value of auto completion
  const [queryValue, setQueryValue] = useState('');
  // ['walk', 'bike', 'car'] store number since faster
  const [distanceType, setDistanceType] = useState(0);
  // distance in minutes, 0 = no restriction
  const [distanceLength, setDistanceLength] = useState(0);

  // handle auto completion change
  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  // handle autocompletion select
  // textContent contains the new value
  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  // check active and display color accordingly
  const checkActiveType = type => {
    return distanceType === type ? { color: '#5e81ac' } : {};
  };

  // set new distance type
  const handleDistanceTypeSelect = type => {
    setDistanceType(type);
  };

  // update length when slider changes
  const handleDistanceLengthChange = (e, newValue) => {
    setDistanceLength(newValue);
  };

  // display slider value to readable form in slider title
  const displayDistanceLength = () => {
    if (distanceLength === 0) {
      return 'No restriction';
    }
    return `${distanceLength}mins`;
  };

  return (
    <div>
      <Autocomplete
        options={searchOptions}
        disableOpenOnFocus
        onChange={handleSelect}
        className={classes.locationFilterAutoComplete}
        renderInput={params => (
          <TextField
            {...params}
            label='Restaurant Type'
            variant='outlined'
            fullWidth
            placeholder='Search restaurant type'
            value={queryValue}
            size='small'
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <div>
        <div className={classes.sliderTitle}>
          <Typography variant='subtitle2'>Distance</Typography>
          <Typography className={classes.sliderTitleCaption} variant='caption'>
            {displayDistanceLength()}
          </Typography>
        </div>
        <div className={classes.distanceSlider}>
          <Slider
            defaultValue={0}
            step={10}
            marks
            max={60}
            min={0}
            valueLabelDisplay='auto'
            value={distanceLength}
            onChange={handleDistanceLengthChange}
          />
        </div>
      </div>
      <div className={classes.sliderSearchOptions}>
        <div className={classes.sliderBtnGroup}>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(0)}
            style={checkActiveType(0)}
          >
            <DirectionsWalk />
          </div>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(1)}
            style={checkActiveType(1)}
          >
            <DirectionsBike />
          </div>
          <div
            className={classes.distanceType}
            onClick={() => handleDistanceTypeSelect(2)}
            style={checkActiveType(2)}
          >
            <DirectionsCar />
          </div>
        </div>
        <Button
          color='primary'
          variant='outlined'
          onClick={() =>
            handleRestaurantSearch(queryValue, distanceType, distanceLength)
          }
        >
          <Typography variant='subtitle2'>Search</Typography>
        </Button>
      </div>
    </div>
  );
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired
};

export default LocationFilterForm;
