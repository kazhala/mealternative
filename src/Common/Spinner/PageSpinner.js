/*
  A big spinner centered in view port to display loading state
*/
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import useStyles from './Style';
import BackDrop from '../BackDrop/BackDrop';

const PageSpinner = props => {
  const classes = useStyles();
  const { loading } = props;
  return (
    <BackDrop show={loading}>
      <CircularProgress
        className={classes.pageSpinner}
        color='primary'
        disableShrink
        size='4rem'
      />
    </BackDrop>
  );
};

PageSpinner.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default PageSpinner;
