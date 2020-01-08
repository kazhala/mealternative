import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ErrorSnack = props => {
  const { error, handleClose } = props;

  return (
    <Snackbar
      open={error ? true : false}
      onClose={handleClose}
      autoHideDuration={5000}
    >
      <Alert
        severity='error'
        variant='filled'
        action={
          <Button onClick={handleClose} color='inherit' size='small'>
            Close
          </Button>
        }
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

ErrorSnack.propTypes = {
  error: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ErrorSnack;
