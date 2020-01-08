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
  Button,
  Fade
} from '@material-ui/core';

const ErrorModal = props => {
  const { handleClose, error } = props;

  return (
    <Fade in={error ? true : false}>
      <Dialog open={true} onClose={handleClose} aria-labelledby='error dialog'>
        <DialogTitle>Oops! Something went wrong..</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fade>
  );
};

ErrorModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default ErrorModal;
