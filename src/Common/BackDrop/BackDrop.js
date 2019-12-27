/*
  BackDrop common wraper component that add a zIndex and center the child
*/
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';
import { Fade } from '@material-ui/core';

const BackDrop = props => {
  const { background, children, handleClose, show } = props;
  const classes = useStyles();

  return (
    <Fade in={show}>
      <div
        style={{ background }}
        className={classes.backDropRoot}
        onClick={handleClose}
      >
        {children}
      </div>
    </Fade>
  );
};

BackDrop.propTypes = {
  background: PropTypes.string,
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func,
  show: PropTypes.bool.isRequired
};

BackDrop.defaultProps = {
  background: 'rgba(0,0,0,0.1)'
};

export default BackDrop;
