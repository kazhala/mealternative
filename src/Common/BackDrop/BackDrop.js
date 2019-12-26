import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Style';

const BackDrop = props => {
  const { background, children } = props;
  const classes = useStyles();

  return (
    <div style={{ background }} className={classes.backDropRoot}>
      {children}
    </div>
  );
};

BackDrop.propTypes = {
  background: PropTypes.string,
  children: PropTypes.element.isRequired
};

BackDrop.defaultProps = {
  background: 'rgba(0,0,0,0.1)'
};

export default BackDrop;
