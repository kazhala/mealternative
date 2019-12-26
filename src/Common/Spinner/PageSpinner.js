import React from 'react';
import { CircularProgress } from '@material-ui/core';
import useStyles from './Style';
import BackDrop from '../BackDrop/BackDrop';

const PageSpinner = props => {
  const classes = useStyles();
  return (
    <BackDrop>
      <CircularProgress
        className={classes.pageSpinner}
        color='primary'
        disableShrink
        size='4rem'
      />
    </BackDrop>
  );
};

export default PageSpinner;
