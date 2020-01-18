import React from 'react';
import PropTypes from 'prop-types';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Sort } from '@material-ui/icons';
import { actions } from '../../../Common/DefaultValues/RecipeOptions';

const SortMenuDial = props => {
  const { classes, sortOption, setSortOption } = props;

  return (
    <SpeedDial
      ariaLabel='Recipe sort speedDial'
      className={classes.recipeDial}
      icon={<Sort />}
      open={sortOption.show}
      onOpen={() => setSortOption({ ...sortOption, show: true })}
      onClose={() => setSortOption({ ...sortOption, show: false })}
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
  setSortOption: PropTypes.func.isRequired,
  sortOption: PropTypes.object.isRequired
};

export default SortMenuDial;
