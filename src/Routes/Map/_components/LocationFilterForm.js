/*
  Filter option form for searching restaurant
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import {
  IconButton,
  TextField,
  Button,
  Typography,
  Slider
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Cached, UnfoldMore } from '@material-ui/icons';

// search auto complete, will refactor to separate file
const searchOptions = ['chinese', 'thai', 'italian', 'pizza', 'ice cream'];

const LocationFilterForm = props => {
  const {
    classes,
    handleRestaurantSearch,
    nextPage,
    setResultRestaurantList,
    resultRestaurantList
  } = props;

  // value of auto completion
  const [queryValue, setQueryValue] = useState('');
  const [queryRadius, setQueryRadius] = useState(0.5);

  // handle auto completion change
  const handleChange = e => {
    setQueryValue(e.target.value);
  };

  // handle autocompletion select
  // textContent contains the new value
  const handleSelect = e => {
    setQueryValue(e.target.textContent);
  };

  const checkDisable = type => {
    if (type === 0) {
      if (nextPage) {
        return !nextPage.hasNextPage;
      } else {
        return true;
      }
    } else {
      return !(resultRestaurantList.length > 0);
    }
  };

  // update length when slider changes
  const handleDistanceLengthChange = (e, newValue) => {
    setQueryRadius(newValue);
  };

  // display slider value to readable form in slider title
  const displayDistanceLength = () => {
    return `${queryRadius}km`;
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
          <Typography variant='subtitle2'>Radius</Typography>
          <Typography className={classes.sliderTitleCaption} variant='caption'>
            {displayDistanceLength()}
          </Typography>
        </div>
        <div className={classes.distanceSlider}>
          <Slider
            defaultValue={0.5}
            step={0.5}
            marks
            max={10}
            min={0.5}
            valueLabelDisplay='auto'
            value={queryRadius}
            onChange={handleDistanceLengthChange}
          />
        </div>
        <div className={classes.sliderSearchOptions}>
          <div>
            <IconButton
              disabled={checkDisable(0)}
              size='small'
              onClick={() => nextPage.nextPage()}
            >
              <Cached />
            </IconButton>
            <IconButton disabled={checkDisable(1)} size='small'>
              <UnfoldMore />
            </IconButton>
          </div>
          <Button
            color='primary'
            variant='outlined'
            onClick={() => {
              setResultRestaurantList([]);
              handleRestaurantSearch(queryValue, queryRadius);
            }}
          >
            <Typography variant='subtitle2'>Search</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

LocationFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleRestaurantSearch: PropTypes.func.isRequired,
  nextPage: PropTypes.any,
  setResultRestaurantList: PropTypes.func.isRequired,
  resultRestaurantList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LocationFilterForm;
