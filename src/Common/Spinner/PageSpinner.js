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
  const { textColor, loading, text, background } = props;
  return (
    <BackDrop background={background} show={loading}>
      <div className={classes.spinnerWraper}>
        <CircularProgress
          className={classes.pageSpinner}
          color='primary'
          disableShrink
          size='4rem'
        />
        {text && (
          <Typography
            style={{ color: textColor }}
            component='div'
            variant='subtitle2'
          >
            {text}
          </Typography>
        )}
      </div>
    </BackDrop>
  );
};

PageSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string,
  background: PropTypes.string,
  textColor: PropTypes.string
};

PageSpinner.defaultProps = {
  background: 'rgba(0,0,0,0.1)',
  textColor: 'rgba(0,0,0,0.87)'
};

export default PageSpinner;
