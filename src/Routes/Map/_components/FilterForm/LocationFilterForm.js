/*
  Filter option form for searching restaurant
*/

// React
import React from 'react';
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

const LocationFilterForm = props => {
  const {
    classes,
    handleRestaurantSearch,
    nextPage,
    setResultRestaurantList,
    setDetailOpen,
    handleSelect,
    queryValue,
    handleChange,
    displayDistanceLength,
    queryRadius,
    handleDistanceLengthChange,
    checkDisable,
    searchOptions
  } = props;

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
        {/* slider */}
        <div className={classes.sliderTitle}>
          <Typography variant='subtitle2'>Radius</Typography>
          <Typography className={classes.sliderTitleCaption} variant='caption'>
            {displayDistanceLength()}
          </Typography>
        </div>
        <div className={classes.distanceSlider}>
          <Slider
            step={0.5}
            marks
            max={10}
            min={0.5}
            valueLabelDisplay='auto'
            value={queryRadius}
            onChange={handleDistanceLengthChange}
          />
        </div>
        {/* loadmore, detail and search button */}
        <div className={classes.sliderSearchOptions}>
          <div>
            <IconButton
              disabled={checkDisable(0)}
              size='small'
              onClick={() => nextPage.nextPage()}
            >
              <Cached />
            </IconButton>
            <IconButton
              onClick={() => setDetailOpen(true)}
              disabled={checkDisable(1)}
              size='small'
            >
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
  setDetailOpen: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  queryValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  displayDistanceLength: PropTypes.func.isRequired,
  queryRadius: PropTypes.number.isRequired,
  handleDistanceLengthChange: PropTypes.func.isRequired,
  checkDisable: PropTypes.func.isRequired,
  searchOptions: PropTypes.array.isRequired
};

export default LocationFilterForm;
