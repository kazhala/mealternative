/*
  Form container for simple form page
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

// misc
import useStyles from './Style';

const FormRoot = props => {
  const { title, success, error, children } = props;

  const classes = useStyles();

  return (
    <div className={classes.formRoot}>
      <div className={classes.formTitle}>
        <Typography variant='h4'>{title}</Typography>
      </div>
      <div className={classes.formAlert}>
        {success && (
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </div>
      {children}
    </div>
  );
};

FormRoot.propTypes = {
  title: PropTypes.string.isRequired,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired
};

export default FormRoot;
