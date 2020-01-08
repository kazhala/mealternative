/*
  A big spinner centered in view port to display loading state
*/
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';
import useStyles from './Style';
import BackDrop from '../BackDrop/BackDrop';

const PageSpinner = props => {
  const classes = useStyles();
  const { loading, text } = props;
  return (
    <BackDrop show={loading}>
      <div className={classes.spinnerWraper}>
        <CircularProgress
          className={classes.pageSpinner}
          color='primary'
          disableShrink
          size='4rem'
        />
        {text && (
          <Typography component='div' variant='subtitle2'>
            {text}
          </Typography>
        )}
      </div>
    </BackDrop>
  );
};

PageSpinner.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default PageSpinner;
