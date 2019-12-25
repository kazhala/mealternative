import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocationInputForm from './LocationInputForm';

const LocationInputContainer = props => {
  const {
    centerMarker,
    lat,
    lng,
    classes,
    handleAutoCompleteUpdate,
    updateCenterMarker
  } = props;

  // value of the textField
  const [value, setValue] = useState('');
  // src for autoCompletion
  const [autoSrc, setAutoSrc] = useState([]);
  // keep track if autoComplete is open
  const [open, setOpen] = useState(false);

  // handle input change and renders the auto completion
  const handleChange = e => {
    setValue(e.target.value);
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

  return (
    <LocationInputForm
      classes={classes}
      updateCenterMarker={updateCenterMarker}
      determineLoading={determineLoading}
      value={value}
      handleChange={handleChange}
      checkOutline={checkOutline}
      setOpen={setOpen}
      autoSrc={autoSrc}
      handleSelect={handleSelect}
      open={open}
    />
  );
};

LocationInputContainer.propTypes = {
  centerMarker: PropTypes.object.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired,
  handleAutoCompleteUpdate: PropTypes.func.isRequired,
  updateCenterMarker: PropTypes.func.isRequired
};

export default LocationInputContainer;
