/*
  Center location input component
  Provide auto complete on address input
*/

// React
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { TextField, CircularProgress, IconButton } from '@material-ui/core';
import {
  AddLocationOutlined,
  LocationOn,
  Home,
  HomeOutlined
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const LocationInputForm = props => {
  const {
    classes,
    updateCenterMarker,
    determineLoading,
    value,
    handleChange,
    checkOutline,
    setOpen,
    autoSrc,
    handleSelect,
    open
  } = props;

  return (
    <div className={classes.locationSelection}>
      <div className={classes.locationBtnGroup}>
        <IconButton
          onClick={() => updateCenterMarker(0, value)}
          color='primary'
        >
          {checkOutline() ? <Home /> : <HomeOutlined />}
        </IconButton>
        <IconButton
          onClick={() => updateCenterMarker(1, value)}
          color='primary'
        >
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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {determineLoading() && <CircularProgress />}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
    </div>
  );
};

LocationInputForm.propTypes = {
  classes: PropTypes.object.isRequired,
  updateCenterMarker: PropTypes.func.isRequired,
  determineLoading: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  checkOutline: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  autoSrc: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default LocationInputForm;
