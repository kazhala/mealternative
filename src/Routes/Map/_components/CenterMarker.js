/*
  The center marker that marks the search center in the map
*/
import React from 'react';
import PropTypes from 'prop-types';
import { PersonPin } from '@material-ui/icons';

const CenterMarker = props => {
  // $hover will dertermine if the component is hovered
  const { classes } = props;

  return (
    <div className={classes.centerMarker}>
      <PersonPin color='primary' fontSize='large' />
    </div>
  );
};

CenterMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  $hover: PropTypes.any
};

export default CenterMarker;
