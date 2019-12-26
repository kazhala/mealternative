/*
  Error handling component to display error message to user
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

const ErrorModal = props => {
  const { handleClose, error } = props;

  return (
    <Dialog
      open={error ? true : false}
      onClose={handleClose}
      aria-labelledby='error dialog'
    >
      <DialogTitle>Oops! Something went wrong..</DialogTitle>
      <DialogContent>
        <DialogContentText>{error}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default ErrorModal;
