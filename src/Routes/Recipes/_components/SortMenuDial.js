import React from 'react';
import PropTypes from 'prop-types';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Sort } from '@material-ui/icons';
import { actions } from '../../../Common/DefaultValues/RecipeOptions';

const SortMenuDial = props => {
  const { classes, showDial, setShowDial } = props;

  return (
    <SpeedDial
      ariaLabel='Recipe sort speedDial'
      className={classes.recipeDial}
      icon={<Sort />}
      open={showDial}
      onOpen={() => setShowDial(true)}
      onClose={() => setShowDial(false)}
    >
      {actions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

SortMenuDial.propTypes = {
  classes: PropTypes.object.isRequired,
  setShowDial: PropTypes.func.isRequired,
  showDial: PropTypes.bool.isRequired
};

export default SortMenuDial;
