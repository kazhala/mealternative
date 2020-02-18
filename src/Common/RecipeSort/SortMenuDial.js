/*
  sorting menu
*/

// react
import React from 'react';
import PropTypes from 'prop-types';

// components
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Sort } from '@material-ui/icons';

// misc
import { actions } from '../DefaultValues/RecipeOptions';
import useStyles from './Style';

const SortMenuDial = props => {
  const { handleSortRecipes, showDial, setShowDial } = props;
  const classes = useStyles();

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
          onClick={() => handleSortRecipes(action.typeNum)}
        />
      ))}
    </SpeedDial>
  );
};

SortMenuDial.propTypes = {
  setShowDial: PropTypes.func.isRequired,
  showDial: PropTypes.bool.isRequired,
  handleSortRecipes: PropTypes.func.isRequired
};

export default SortMenuDial;
