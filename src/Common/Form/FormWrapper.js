/*
  Form wrapper for simple form styling
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// misc
import useStyles from './Style';

const FormWrapper = props => {
  const { onSubmit, children } = props;
  const classes = useStyles();

  return (
    <form className={classes.formForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

FormWrapper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FormWrapper;
