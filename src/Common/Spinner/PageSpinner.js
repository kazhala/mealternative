import React from 'react';
import { CircularProgress } from '@material-ui/core';

const PageSpinner = props => {
  return (
    <div>
      <CircularProgress color='primary' disableShrink />
    </div>
  );
};

export default PageSpinner;
