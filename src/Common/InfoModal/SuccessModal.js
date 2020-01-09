import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Fade,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

const SuccessModal = props => {
  const { message, success, title } = props;

  return (
    <Fade in={success ? true : false}>
      <Dialog open={true} aria-labelledby='success dialog'>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Fade>
  );
};

SuccessModal.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  title: PropTypes.string.isRequired
};

export default SuccessModal;
