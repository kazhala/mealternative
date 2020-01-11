import React from 'react';
import PropTypes from 'prop-types';
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
  handleFormSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FormWrapper;
