import React from 'react';
import { CircularProgress } from '@material-ui/core';
import useStyles from './Style';

const PageSpinner = props => {
  const classes = useStyles();
  return (
    <div className={classes.pageSpinnerRoot}>
      <CircularProgress
        className={classes.pageSpinner}
        color='primary'
        disableShrink
        size='4rem'
      />
    </div>
  );
};

export default PageSpinner;
