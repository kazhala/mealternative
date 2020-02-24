/*
  sorting menu
*/

// react
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Sort } from '@material-ui/icons';

// misc
import {
  actions,
  selectedActions,
  orderByArr
} from '../DefaultValues/RecipeOptions';
import useStyles from './Style';

const SortMenuDial = props => {
  const { handleSortRecipes, showDial, setShowDial, activeSelection } = props;
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const typeNum = orderByArr.indexOf(activeSelection);
    if (typeNum === -1) {
      setActiveIndex(null);
    } else {
      actions.forEach((action, index) => {
        if (action.typeNum === typeNum) {
          setActiveIndex(index);
        }
      });
    }
  }, [activeSelection]);

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
          style={{ opacity: '0.3' }}
          key={index}
          icon={
            activeIndex && index === activeIndex
              ? selectedActions[activeIndex]
              : action.icon
          }
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
  handleSortRecipes: PropTypes.func.isRequired,
  activeSelection: PropTypes.string.isRequired
};

export default SortMenuDial;
