import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const SuccessSnack = props => {
  const { message, handleClose } = props;

  return (
    <Snackbar
      open={message ? true : false}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='success' variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};

SuccessSnack.propTypes = {
  messsage: PropTypes.string,
  handleClose: PropTypes.func.isRequired
};

export default SuccessSnack;
