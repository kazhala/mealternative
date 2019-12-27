/*
  BackDrop common wraper component that add a zIndex and center the child
*/
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';

const BackDrop = props => {
  const { background, children, handleClose } = props;
  const classes = useStyles();

  return (
    <div
      style={{ background }}
      className={classes.backDropRoot}
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

BackDrop.propTypes = {
  background: PropTypes.string,
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func
};

BackDrop.defaultProps = {
  background: 'rgba(0,0,0,0.1)'
};

export default BackDrop;
