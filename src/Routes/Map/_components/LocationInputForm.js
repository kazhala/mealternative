/*
  Center location input component
  Provide auto complete on address input
*/

// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { TextField, IconButton } from '@material-ui/core';
import {
  AddLocationOutlined,
  LocationOn,
  Home,
  HomeOutlined
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const LocationInputForm = props => {
  const {
    centerMarker,
    lat,
    lng,
    classes,
    handleAutoCompleteUpdate,
    updateCenterMarker,
    setSelectedMarker
  } = props;

  // value of the textField
  const [value, setValue] = useState('');
  // src for autoCompletion
  const [autoSrc, setAutoSrc] = useState([]);
  // keep track if autoComplete is open
  const [open, setOpen] = useState(false);

  // handle input change and renders the auto completion
  const handleChange = e => {
    // call google map api to update autoCompleteSrc
    // will gave a call back
    handleAutoCompleteUpdate(e.target.value, dataSource =>
      setAutoSrc(dataSource)
    );
  };

  // handle action when user clicks on the suggestion
  const handleSelect = e => {
    // value is not provided in this event, could get details in e.target.textContent
    // Probably need to change to a better method later
    setValue(e.target.textContent);
  };

  // check if the loading state of the autoComplete should be displayed
  const determineLoading = () => {
    return open && !autoSrc.length > 0;
  };

  // check if the button should have outline to indicate active
  const checkOutline = () => {
    return centerMarker.lat === lat && centerMarker.lng === lng;
  };

  const handleClick = type => {
    updateCenterMarker(type, value);
    setSelectedMarker({});
  };

  return (
    <div className={classes.locationSelection}>
      <div className={classes.locationBtnGroup}>
        <IconButton onClick={() => handleClick(0)} color='primary'>
          {checkOutline() ? <Home /> : <HomeOutlined />}
        </IconButton>
        <IconButton onClick={() => handleClick(1)} color='primary'>
          {!checkOutline() ? <LocationOn /> : <AddLocationOutlined />}
        </IconButton>
      </div>
      <Autocomplete
        options={autoSrc}
        loading={determineLoading()}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        disableOpenOnFocus
        onChange={handleSelect}
        renderInput={params => (
          <TextField
            {...params}
            label='Location center'
            variant='outlined'
            fullWidth
            placeholder='Add address'
            value={value}
            onChange={handleChange}
            size='small'
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </div>
  );
};

LocationInputForm.propTypes = {
  centerMarker: PropTypes.object.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired,
  handleAutoCompleteUpdate: PropTypes.func.isRequired,
  updateCenterMarker: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired
};

export default LocationInputForm;
